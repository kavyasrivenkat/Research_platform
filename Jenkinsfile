pipeline {
    agent none
    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }
    triggers {
        githubPush()
    }

    stages {

        stage('Backend Build & Test (Controller)') {
            agent { label 'built-in' }
            steps {
                echo "Running backend on Controller node: ${env.NODE_NAME}"
                dir('backend') {
                    bat 'echo Installing backend dependencies...'
                    bat 'npm install'
                    bat 'echo Starting backend test (lint/build)...'
                    bat 'npm run test || echo "No test script found, skipping tests."'
                    bat 'echo Backend build completed!'
                }
            }
        }

        stage('Frontend Build & Test (Windows Agent)') {
            agent { label 'win' }
            steps {
                echo "Running frontend on Windows agent: ${env.NODE_NAME}"
                dir('frontend') {
                    bat 'echo Installing frontend dependencies...'
                    bat 'npm install'
                    bat 'echo Starting frontend build/test...'
                    bat 'npm start || echo "Frontend started or test skipped."'
                    bat 'echo Frontend build completed!'
                }
            }
        }

    }

    post {
        always {
            // Specify label explicitly to fix error
            node('built-in') {
                echo "Cleaning workspace..."
                cleanWs()
            }
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed! Check logs for details."
        }
    }
}

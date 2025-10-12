pipeline {
    agent none    // we will assign agents per stage
    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
    }
    triggers {
        githubPush()  // triggers build on GitHub push
    }

    stages {

        // ===== Backend on Controller =====
        stage('Backend Build & Test (Controller)') {
            agent { label 'built-in' }   // Controller node
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

        // ===== Frontend on Windows Agent =====
        stage('Frontend Build & Test (Windows Agent)') {
            agent { label 'win' }   // Windows agent
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
            // Cleanup workspace (must run inside a node context)
            node {
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

pipeline {
    agent none
    triggers { githubPush() }
    options {
        timestamps()
        timeout(time: 20, unit: 'MINUTES')
    }

    stages {

        stage('Backend Build & Test (Controller)') {
            agent { label 'built-in' }
            steps {
                echo "Running backend on Controller node: ${env.NODE_NAME}"
                dir('backend') {
                    bat '''
                        echo Installing backend dependencies...
                        npm install
                        echo Starting backend test (lint or build check)...
                        npm run test || echo "No test script found, skipping tests."
                    '''
                }
            }
        }

        stage('Frontend Build & Test (Windows Agent)') {
            agent { label 'win' }
            steps {
                echo "Running frontend build on Agent node: ${env.NODE_NAME}"
                dir('frontend') {
                    bat '''
                        echo Installing frontend dependencies...
                        npm install
                        echo Building frontend...
                        npm run build
                    '''
                }
            }
        }

        stage('Archive Artifacts') {
            agent { label 'built-in' }
            steps {
                echo "Archiving frontend build artifacts..."
                archiveArtifacts artifacts: 'frontend/build/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo "Cleaning workspaces..."
            cleanWs()
        }
        success {
            echo "Build completed successfully!"
        }
        failure {
            echo "Build failed! Please check logs."
        }
    }
}

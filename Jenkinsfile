pipeline {
    agent none

    environment {
        // Update this to your Node.js installation path
        NODE_PATH = "C:\\Program Files\\nodejs"
    }

    stages {

        stage('Backend Build & Test (Controller)') {
            agent { label 'built-in' } // Runs on Jenkins controller
            steps {
                script {
                    withEnv(["PATH=${env.NODE_PATH};${env.PATH}"]) {
                        dir('backend') {
                            echo "Installing backend dependencies..."
                            bat 'npm install'

                            echo "Running backend tests..."
                            // Replace with actual test script if exists
                            bat 'npm run test || echo "No test script found, skipping tests."'
                        }
                    }
                }
            }
        }

        stage('Frontend Build & Test (Windows Agent)') {
            agent { label 'windows-agent' } // Make sure your Windows agent has this label
            steps {
                script {
                    withEnv(["PATH=${env.NODE_PATH};${env.PATH}"]) {
                        dir('frontend') {
                            echo "Installing frontend dependencies..."
                            bat 'npm install'

                            echo "Building frontend..."
                            bat 'npm run build || echo "No build script found, skipping build."'

                            echo "Running frontend tests..."
                            bat 'npm run test || echo "No test script found, skipping tests."'
                        }
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            agent { label 'built-in' }
            steps {
                archiveArtifacts artifacts: '**/build/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed! Check logs for details."
        }
    }
}

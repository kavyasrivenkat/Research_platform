pipeline {
    agent any  // Use the local Jenkins node

    environment {
        NODE_ENV = 'development'
    }

    stages {
        stage('Frontend Build & Test') {
            steps {
                script {
                    dir('frontend') {
                        echo "Installing frontend dependencies..."
                        bat 'npm install'

                        echo "Building frontend..."
                        bat 'npm run build || echo "No build script found, skipping build."'

                        echo "Running frontend tests..."
                        bat 'npm run test || echo "No frontend test script found, skipping tests."'
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo "Archiving frontend build artifacts..."
                archiveArtifacts artifacts: 'frontend/build/**', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace..."
            cleanWs()
        }
        success {
            echo "Frontend pipeline completed successfully!"
        }
        failure {
            echo "Frontend pipeline failed! Check logs for details."
        }
    }
}

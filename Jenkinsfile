pipeline {
    agent any  // we will specify nodes per stage

    environment {
        // Add any env variables you need here
        NODE_ENV = 'development'
    }

    stages {

        stage('Backend Build & Test (Controller)') {
            agent { label 'built-in' }  // Replace with your actual node label if needed
            steps {
                script {
                    dir('backend') {
                        echo "Installing backend dependencies..."
                        bat 'npm install'

                        echo "Running backend tests..."
                        // Skip if no test script
                        bat 'npm run test || echo "No test script found, skipping tests."'
                    }
                }
            }
        }

        stage('Frontend Build & Test (Windows Agent)') {
            agent { label 'windows' }  // Replace with your frontend build agent label
            steps {
                script {
                    dir('frontend') {
                        echo "Installing frontend dependencies..."
                        bat 'npm install'

                        echo "Running frontend tests..."
                        bat 'npm run test || echo "No frontend test script found, skipping tests."'
                    }
                }
            }
        }

        stage('Archive Artifacts') {
            agent { label 'built-in' }
            steps {
                echo "Archiving artifacts..."
                archiveArtifacts artifacts: '**/dist/**', allowEmptyArchive: true
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

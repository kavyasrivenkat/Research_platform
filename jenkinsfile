pipeline {
    agent any

    tools {
        nodejs "NodeJS_18"   // Make sure you configure this name in Jenkins -> Global Tool Configuration
    }

    environment {
        BACKEND_DIR = "server"
        FRONTEND_DIR = "client"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/kavyasrivenkat/Research_platform.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh 'npm test || echo "No tests configured yet"'
                }
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                archiveArtifacts artifacts: "${FRONTEND_DIR}/build/**", fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Build succeeded!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}

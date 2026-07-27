pipeline {
    agent any

    environment {
        REGISTRY = 'ghcr.io'
        IMAGE_NAME = 'ghcr.io/paull-fe/artefact-fe'
        // TODO: fill in once the target server is decided
        DEPLOY_HOST = 'CHANGE_ME_SERVER_IP'
        DEPLOY_USER = 'CHANGE_ME_SSH_USER'
        DEPLOY_PATH = '/CHANGE_ME/path/to/project-root'
        // TODO: replace with the real production domain once it's registered/pointed
        DOMAIN = 'CHANGE_ME_DOMAIN'
        REACT_APP_BASE_URL = 'https://CHANGE_ME_DOMAIN'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/PaulL-FE/Artefact-FE.git',
                    credentialsId: 'github-token'
            }
        }

        stage('Build Image') {
            steps {
                script {
                    def commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.COMMIT_HASH = commitHash
                    sh """
                        docker build \
                            --build-arg REACT_APP_BASE_URL=${REACT_APP_BASE_URL} \
                            --build-arg DOMAIN=${DOMAIN} \
                            -t ${IMAGE_NAME}:${commitHash} \
                            -t ${IMAGE_NAME}:latest .
                    """
                }
            }
        }

        stage('Push Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'github-token', usernameVariable: 'GH_USER', passwordVariable: 'GH_TOKEN')]) {
                    sh """
                        echo \$GH_TOKEN | docker login ${REGISTRY} -u \$GH_USER --password-stdin
                        docker push ${IMAGE_NAME}:${COMMIT_HASH}
                        docker push ${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'hetzner-ssh', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')
                ]) {
                    sh """
                        sshpass -p \$SSH_PASS ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} << 'ENDSSH'
                            cd ${DEPLOY_PATH}
                            docker compose pull frontend
                            docker compose up -d --force-recreate --no-deps frontend
                            docker image prune -f
ENDSSH
                    """
                    // NOTE: 'frontend' is the docker-compose service name on the target server.
                    // If this server already runs another frontend (e.g. CvLab-FE), rename the
                    // service in docker-compose.yml (and here) to avoid clobbering it.
                }
            }
        }
    }

    post {
        success {
            echo "Frontend deployed successfully! Image: ${IMAGE_NAME}:${COMMIT_HASH}"
        }
        failure {
            echo "Frontend pipeline failed!"
        }
        always {
            sh "docker rmi ${IMAGE_NAME}:${COMMIT_HASH} || true"
            sh "docker rmi ${IMAGE_NAME}:latest || true"
        }
    }
}

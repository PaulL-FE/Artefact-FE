pipeline {
    agent any

    environment {
        ENV_NAME = 'prod'
        CONTAINER_NAME = "node-build-${ENV_NAME}"
        DEPLOY_HOST = '178.105.101.11'
        DEPLOY_USER = 'ubuntu2'
        DEPLOY_PATH = '/home/ubuntu2/Desktop/artefact-fe-prod'
        REACT_APP_BASE_URL = 'https://art-fact.ai'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'prod',
                    url: 'https://github.com/PaulL-FE/Artefact-FE.git',
                    credentialsId: 'github-paul-token'
            }
        }

        stage('Cleanup Stale Container') {
            steps {
                sh """
                    docker rm -f ${CONTAINER_NAME} || true
                """
            }
        }

        stage('Build Static Files') {
            steps {
                withCredentials([
                    string(credentialsId: 'react-app-mixpane-token', variable: 'REACT_APP_MIXPANE_TOKEN'),
                    string(credentialsId: 'react-app-ga4-measurement-id', variable: 'REACT_APP_GA4_MEASUREMENT_ID'),
                    string(credentialsId: 'react-app-web3forms-access-key', variable: 'REACT_APP_WEB3FORMS_ACCESS_KEY')
                ]) {
                    script {
                        def commitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                        env.COMMIT_HASH = commitHash
                        sh """
                            docker run --rm --name ${CONTAINER_NAME} \
                                --mount type=bind,source=\$(pwd),target=/build \
                                -w /build \
                                -e REACT_APP_BASE_URL=${REACT_APP_BASE_URL} \
                                -e REACT_APP_MIXPANE_TOKEN=\$REACT_APP_MIXPANE_TOKEN \
                                -e REACT_APP_GA4_MEASUREMENT_ID=\$REACT_APP_GA4_MEASUREMENT_ID \
                                -e REACT_APP_WEB3FORMS_ACCESS_KEY=\$REACT_APP_WEB3FORMS_ACCESS_KEY \
                                -e HOME=/tmp \
                                --user "\$(id -u):\$(id -g)" \
                                node:22-alpine \
                                sh -c "npm install --legacy-peer-deps && npm run build"
                        """
                    }
                }
            }
        }

        stage('Transfer to Server') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'artefact-fe-ssh', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')
                ]) {
                    sh """
                        sshpass -p \$SSH_PASS scp -o StrictHostKeyChecking=no -r \
                            build/* \
                            ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/frontend/build/

                        sshpass -p \$SSH_PASS scp -o StrictHostKeyChecking=no \
                            nginx.conf.template \
                            ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/frontend/nginx.conf.template
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([
                    usernamePassword(credentialsId: 'artefact-fe-ssh', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PASS')
                ]) {
                    sh """
                        sshpass -p \$SSH_PASS ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_HOST} << 'ENDSSH'
                            cd ${DEPLOY_PATH}
                            docker compose up -d --force-recreate --no-deps frontend
ENDSSH
                    """
                }
            }
        }
    }

    post {
        success {
            echo "FE-Prod deployed! Commit: ${COMMIT_HASH}"
        }
        failure {
            echo "FE-Prod pipeline failed!"
        }
        always {
            sh "rm -rf build/ node_modules/ || true"
        }
    }
}

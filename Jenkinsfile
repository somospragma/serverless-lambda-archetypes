ppipeline {
    agent any
    environment {
        SONAR_TOOL = "SonarQube-3.3.0"
        SONAR_URL = "${SONAR_URL}"
        PROJECT = "${PROJECT}"
        REGISTRY_URL = "${REGISTRY_URL}"
        AWS_CREDENTIALS_ID = "${AWS_CREDENTIALS_ID}"
        AWS_ACCESS_KEY_ID = "${AWS_ACCESS_KEY_ID}"
        AWS_SECRET_ACCESS_KEY = "${AWS_SECRET_ACCESS_KEY}"
        AWS_DEFAULT_REGION = "us-east-1"
    }
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('npm install') {
            steps {
                environment name: 'HOME', value: './'
                sh 'npm install --cache=./.npm --quiet'
            }
        }
        //stage('unit test') {
        //    steps {
        //        sh 'npm test'
        //    }
        //}
        stage("SonarQube analysis") {
            steps {
                echo "[EXEC] - Análisis estático de código"
                script {
                    def scannerHome = tool "${SONAR_TOOL}";
                    withSonarQubeEnv('SonarQube_DevOps02') {
                        sh "${scannerHome}/bin/sonar-scanner -Dsonar.projectKey=${PROJECT} -Dsonar.sources=."
                    }
                }
            }
        }
        stage('deploy:dev') {
            when {
                branch 'develop'
            }
            steps {
                withCredentials([
                  [
                      $class: 'AmazonWebServicesCredentialsBinding',
                      credentialsId: "${AWS_CREDENTIALS_ID}",
                      accessKeyVariable: "${AWS_ACCESS_KEY_ID}",
                      secretKeyVariable: "${AWS_SECRET_ACCESS_KEY}"
                  ]
                ]) {
                    sh 'aws configure list'
                    sh 'serverless deploy'
                }
            }
        }
        stage('deploy:prod') {
            when {
                branch 'master'
            }
            steps {
                withCredentials([
                  [
                      $class: 'AmazonWebServicesCredentialsBinding',
                      credentialsId: "${AWS_CREDENTIALS_ID}",
                      accessKeyVariable: "${AWS_ACCESS_KEY_ID}",
                      secretKeyVariable: "${AWS_SECRET_ACCESS_KEY}"
                  ]
                ]) {
                    sh 'serverless deploy --stage production'
                }
            }
        }
    }
    // post {
    //   regression {
    //     slackSend channel: '#st-web', color: 'danger', message: "${env.JOB_NAME} Regressed"
    //   }
    //   fixed {
    //     slackSend channel: '#st-web', color: 'good', message: "${env.JOB_NAME} Fixed"
    //   }
    // }
}
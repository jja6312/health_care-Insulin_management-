#!/bin/bash

# AWS Secrets Manager에서 환경 변수 조회
SECRET_NAME="aws/secretsmanager/nonghyuphealthcare"
REGION="ap-northeast-2"

# AWS CLI를 사용하여 비밀 값을 조회
SECRET=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME --region $REGION --query SecretString --output text)

# 조회된 비밀 값을 환경 변수로 설정
export DATABASE_URL=$(echo $SECRET | jq -r .DATABASE_URL)
export DATABASE_USERNAME=$(echo $SECRET | jq -r .DATABASE_USERNAME)
export DATABASE_PASSWORD=$(echo $SECRET | jq -r .DATABASE_PASSWORD)

# Spring Boot 애플리케이션 디렉터리
SPRINGBOOT_DIR="/opt/nonghyuphealthcare/springboot"

# 이전에 실행된 Spring Boot 애플리케이션 종료
CURRENT_PID=$(pgrep -f 'nonghyuphealthcare.*.jar')
if [ -n "$CURRENT_PID" ]; then
    echo "Stopping running Spring Boot application"
    kill -15 "$CURRENT_PID"
fi

# 잠시 대기
sleep 5

# 새 Spring Boot 애플리케이션 배포
JAR_NAME=$(ls $SPRINGBOOT_DIR | grep '.jar' | tail -n 1)
echo "Deploying $JAR_NAME"
#nohup java -Duser.timezone=Asia/Seoul -jar $SPRINGBOOT_DIR/$JAR_NAME > $SPRINGBOOT_DIR/$(date +%F_%T)-nohup.out 2>&1 &
#ec2 상태검사 1/2로 변하는 에러를 /dev/null로 리다이렉션해서 해결해보자.(로그 기록 x)
nohup java -Duser.timezone=Asia/Seoul -jar $SPRINGBOOT_DIR/$JAR_NAME > /dev/null 2>&1 &


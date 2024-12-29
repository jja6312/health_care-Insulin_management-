
**🔴 해당 프로젝트는 스마트폰 화면에 최적화 되어 있습니다.**

# 농협생명 사원 대상 당뇨 관리 리포트

---
<div align="center">
    <img src="https://github.com/user-attachments/assets/53177c3c-da22-4bf2-a40d-cde5c2f038f4" alt="Project Logo" width="500">
</div>

> **개인 프로젝트**  
> 개발기간: 6주 (2024.05.12 ~ 06.23)  
> 유지보수: 3주 (2024.06.24 ~ 09.15)

---

## 배포주소
(STOP)http://nonghyuphealthcare-react.s3-website.ap-northeast-2.amazonaws.com/login
테스트 아이디 : test  
테스트 비밀번호 : 123
---

## 프로젝트 소개

농협생명 사원 15명을 대상으로, 검사/설명 데이터를 통해 당뇨 등급을 분류하고, 등급에 맞는 교육 자료를 제공하는 사이트입니다.  
관리자가 교육자료를 관리자페이지를 통해 업데이트하고, 이를 사원들이 알림페이지를 통해 확인하도록 설계되었습니다.

---

# 주요 화면

| 메인 페이지                         | 관리자 페이지                    | 알림 페이지                           |
|-----------------------------------|-------------------------------|------------------------------------|
| ![메인페이지](https://github.com/user-attachments/assets/abc123.png) | ![관리자페이지](https://github.com/user-attachments/assets/def456.png) | ![알림페이지](https://github.com/user-attachments/assets/ghi789.png) |

---

# 개발 주요 사항

- **고객 요구사항 분석**: 농협생명 담당자와 회원들의 실질적 요구사항을 수집하여 Figma로 설계.
- **Spring Boot REST API** 기반 서버 개발.
- **AWS 서비스 활용**:
  - **EC2**: 배포 및 서버 환경 구성.
  - **S3**: 데이터 및 파일 저장소.
  - **CodeDeploy**: CI/CD 파이프라인 구축.
- **효율적 데이터 처리**: JPA의 `Fetch Join`과 `Batch Size`로 **N+1 문제** 해결.

---

# 사용 기술

| **프론트엔드**     | **백엔드**         | **데이터베이스** | **인프라**      |
|------------------|------------------|--------------|---------------|
| React, TailwindCSS | Spring Boot, JPA | MySQL        | AWS, CodeDeploy, S3 |

---

# 개발 관련 설명
실 서비스되는 웹 개발을 시도해보며 실제 현업에서 수행하는 소프트웨어 개발 생명 주기 전 과정을 몸소 느낄 수 있었습니다. 
개발부터 CI/CD, 운영 및 클라이언트의 지속적인 요구사항 변경 등 다양한 문제에 부딪히고 해결해 나가는 과정에서 저도 함께 성장하는 것을 느낄 수 있었습니다. 
실제 사용자가 있는 만큼 서버 다운타임을 최소화하기 위해 AWS Cloud Watch를 통한 서버 이상시 메일 알람과 같은 각별한 주의를 기울인 프로젝트였습니다. 
돌이켜 생각해 보면, 장애 발생시 복구될 수 있도록 AutoScailing을 트리거했다면 더 좋았을 것이라고 생각합니다.

---

# 디렉토리 구조

```bash
HealthCareProject/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── io/nhlife/healthcare/
│   │   │       ├── domain/
│   │   │       │   └── InsulinManagementEntity.java
│   │   │       ├── service/
│   │   │       │   └── HealthService.java
│   │   │       ├── repository/
│   │   │       │   └── InsulinManagementRepository.java
│   │   │       └── controller/
│   │   │           └── HealthCareController.java
│   └── resources/
│       ├── application.yml
│       └── static/
├── Dockerfile
├── README.md
└── pom.xml

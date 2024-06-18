# Project Specifications 

T-YEP-600-PAR_6

# **Introduction**
## **Project Overview**
### But
Création d'une application mobile qui permet d'améliorer la gestion de son temps et de renforcer les relations sociales en proposant des activités adaptées aux disponibilités et aux priorités de l'utilisateur.

### Périmètre
Le projet inclut le développement de fonctionnalités de synchronisation des calendriers, de suggestions d'activités basées sur les préférences et les priorités de l'utilisateur, ainsi que des options de partage et de collaboration pour planifier des événements avec d'autres utilisateurs.

### Objectifs
- **Intégration des calendriers** : Fusionner les agendas personnels et publics des utilisateurs.
- **Priorisation des activités** : Utiliser un système de priorisation pour recommander des activités pertinentes.
- **Facilitation de la planification sociale** : Proposer des options pour organiser des événements avec des amis et la famille, un système de groupes 
- **Interface intuitive** : Développer une interface utilisateur conviviale et facile à utiliser.
## **Background**
Dans notre groupe, nous avons identifié un besoin significatif d'améliorer notre organisation pour les sorties et activités de groupe. Actuellement, il est difficile pour nous de synchroniser nos emplois du temps respectifs, ce qui complique la planification et l'exécution d'activités communes pendant nos temps libres. Cette situation conduit souvent à des annulations de dernière minute, des conflits d'horaires et une participation moindre aux événements de groupe.

Pour répondre à ce besoin, nous proposons de développer une application qui centralisera les emplois du temps de chaque membre du groupe. Cette application nous permettra de visualiser les disponibilités de chacun à un seul endroit et de planifier des activités de manière efficace et harmonieuse. Avec cette solution, nous espérons améliorer la communication et la coordination au sein du groupe, facilitant ainsi l'organisation des sorties et renforçant notre cohésion sociale.

## **Stakeholders**
La liste des 7 étudiants réalisant le projet de fin d'année pour le cursus PRÉ-MSC à EPITECH. 

Les participants sont : 

- Ethan Bellaiche => Data Architecte + Dev FullStack  
- Massi Bouaza =>  Dev Full Stack
- Noah Daën => Co-chef de projet + Dev Front  + Design 
- Gabriel Lopez => Co-chef de projet + Architecte d'application 
- Elone Meimoun => CyberSecurité + Dev Front 
- Qin-Hao Wu => Dev Full Stack + Design
- Mohamed-Amin Ramdani => Dev Full Stack + DevOps 
# **Requirements**
## **Functional Requirements**
Voici la description détaillée des fonctionnalités que l'application devrait fournir.

### Authentification
- Se créer un compte
- Se connecter
- Se déconnecter
- Modifier ses informations de connexion
### Profil social
- CRUD des informations publiques
    - Photo de profil
    - Pseudo
    - Description
- Spécifier vos loisirs/centres d'intérêt
### Planner
- Créer des événements publics ou privés dans son planning
- Consultation de son calendrier
- Possibilité d'appliquer des filtres à son calendrier
- Trouver des créneaux libres en fonction de votre planning et celui de vos amis
- Suggérer des activités pendant les temps libres en fonction des loisirs
### Messagerie
- Créer un chat de groupe
- Intégrer votre planning dans le chat de groupe
- Rechercher, ajouter, et supprimer des contacts
### Organisation d'événements
- Créer des événements dans le chat de groupe
- Supprimer automatiquement le chat d'événement lorsque l'événement se termine
- Créer des événements publics 
- Créer des _scopes _(liste de personnes) pour les événements publics
### Routines
- Ajouter des tâches récurrentes liées a un objectif
    - La récurrence peut être temporelle ou calendaire
        - Toutes les semaines / tous les 3 jours
        - Permet de réserver du temps pour soi
    - Système de priorisation
        - Regarder une série est moins important que voir ses amis (ou pas ?)
    - Conciliation routines et amis
        - Je veux faire du sport et mon ami aussi 
- Compte à rebours pour rappeler à l'utilisateur ayant fixé l'objectif de le réaliser
### Gestion du temps et de la distance
- Utiliser votre localisation et celle de vos amis pour calculer les temps de trajet en fonction de l'événement
- Rappeler aux participants de partir à l'heure


## **Non-Functional Requirements**
Performance, usability, reliability, and other quality attributes.

## **User Stories/Use Cases**
Scénarios décrivant comment les utilisateurs vont intéragir avec le système

??? Vérifier si le graph est bien ??? 

[![User stories](https://app.eraser.io/workspace/sLj38VlDfi6ukT8JsH75/preview?elements=0I7BaoTuXjoz1Y42sQOJBg&type=embed)](https://app.eraser.io/workspace/sLj38VlDfi6ukT8JsH75?elements=0I7BaoTuXjoz1Y42sQOJBg)



# **System Architecture**
## **Overview**
[![Architecture](https://app.eraser.io/workspace/sLj38VlDfi6ukT8JsH75/preview?elements=eOD04PvPmLzt8GpSLNYOkQ&type=embed)](https://app.eraser.io/workspace/sLj38VlDfi6ukT8JsH75?elements=eOD04PvPmLzt8GpSLNYOkQ)



## **Components**
Description of major system components and their interactions.

-  API Gateway
    - An extra service that you put in front of your other services so you can do composition of services.
    - [﻿medium.com/@noumcpe0007/build-an-api-gateway-with-nestjs-6140c1458200](https://medium.com/@noumcpe0007/build-an-api-gateway-with-nestjs-6140c1458200) 
## **Data Flow Diagrams**
Visual representation of data movement within the system.

- [﻿blog.hubspot.com/marketing/data-flow-diagram](https://blog.hubspot.com/marketing/data-flow-diagram) 
- [﻿miro.com/diagramming/what-is-a-data-flow-diagram/](https://miro.com/diagramming/what-is-a-data-flow-diagram/) 
- [﻿www.lucidchart.com/pages/data-flow-diagram](https://www.lucidchart.com/pages/data-flow-diagram) 


## **Technology Stack**
**Frontend**

- React Native (TypeScript)
    - Réutilisation des acquis de **T-DEV-600**
- Cache Redis ?
**Backend**

- Nest.js (TypeScript)
- Kafka (Event streaming platform)
- [﻿Socket.io](https://socket.io/) (WebHooks) 
    - Réutilisation des acquis de **T-JSF-600**
**DevOps**

- GitHub actions (Constant Integration)
- Docker (Containerization)
    - Réutilisation des acquis de **T-DOP-601**
- ArgoCD (Constant Deployment)
- Kubernetes (Orchestration)
    - Réutilisation des acquis de **T-DOP-603**
# **Design Specifications**
## **User Interface Design**
- Design KIT : [﻿Material 3](https://m3.material.io/)﻿
- [﻿Figma](https://www.figma.com/design/6oBxvHpocEBvX8rAPwlWO6/Material-3-Design-Kit-(Community)?t=HeMQ3JPdZApkplHW-0) pour réaliser les maquettes de l'application
- Frontend App : [﻿React Native Paper](https://callstack.github.io/react-native-paper/docs/components/ActivityIndicator), librairie qui utilise le design kit que l'on utilise
## **Database Design**
- Diagramme Entité-Relations
- Définition des schemas de données
- Définition des besoins de stockage (Postgres ?)
    - Stockage pour les _topics _Kafka
    - Ajout d'un cache avec Redis ?
## **API Design**
Specifications for any APIs, including endpoints, request/response formats, and authentication.

# **Development Plan**
## **Project Phases**
Division du projet en plusieurs phases ou sprints.

=> Nous allons définir des **milestones **sur le repo github.

## **Task Breakdown**
Nous allons utiliser **GitHub issues **pour la répartion des features mineures et majeures entre chaque follow-up.

## **Timeline**
Nous allons utiliser un **Github Project **pour avoir un kanban board.

# **Testing Plan**
- Nest JS  
    - [﻿docs.nestjs.com/fundamentals/testing](https://docs.nestjs.com/fundamentals/testing) 
- React Native
    - [﻿reactnative.dev/docs/testing-overview](https://reactnative.dev/docs/testing-overview) 
## **Testing Strategy**
Le choix d'une application en fullstack TypeScript nous permet d'utiliser une seule pipeline d'intégration constante.

Celle ci sera impémentée à l'aide de GitHub Actions.

Notre souhaitons créer des tests unitaires avec Jest qui permettent d'assurer la non régression et l'intégration des nouvelles features.

## **Test Cases**
Detailed test cases for functional and non-functional requirements.

## **Acceptance Criteria**
Conditions that must be met for the project to be accepted.

# **Deployment Plan**
## **Environment Setup**
**Development**

- Docker Compose
**Staging**

- To be discussed 
**Production**

- Google Kubernetes Engine
## **Deployment Process**
Steps and tools for deploying the software.

## **Rollout Plan**
Strategy for releasing the software to users.

# **Maintenance and Support**
## **Maintenance Plan**
Approach for maintaining and updating the software post-deployment.

## **Support Plan**
Details on how users will receive support and report issues.





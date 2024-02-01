
[//]: # (TITLE Mind ur business)
[//]: # (ENDPOINT /int)

# Interview prep

## 1 - Glossary

- **DOM (Document Object Model)** <br>
It's a programming interface for web documents. It represents the page as nodes so that programs can change the document structure, style, and content. <br>
**HTML** represents the **initial page content**, whereas the **DOM** represents the **updated page content** which was changed by the JavaScript code you wrote.

- **JSX** <br>
A **syntax extension** for JavaScript that allows you to use an HTML-like syntax in JS. It has only three rules: **return a single root element**, **close all tags**, **replace dashes with camelCase** eg: class becomes className, margin-right becomes marginRight etc.
**React is compiled because JSX needs to be compiled to JS**.

- **Opinionated** <br>
Said of a framework that **locks or guides you into their way of doing things**. Un-opinionated software design allows and trusts the developer to make the right decisions and puts more control in their hands. 


## 2 - Culture

### 2.1 - Framework vs library

> A **framework** is a set of pre-written code that provides a **structure for developing software applications**.<br>A **library**, on the other hand, is a collection of pre-written code that can be used to **perform specific tasks**.

**Frameworks** are **abstractions** in which software, providing generic functionality, can be selectively **changed by additional user-written code**, thus providing **application-specific software**. It provides a standard way to build and deploy applications. 

**Libraries** are **collections of non-volatile resources** used by computer programs, often for software development. These may include configuration data, documentation, message templates, pre-written code, classes, values or type specifications. They can be **used when imported**, at any given point.

By using a library, you control the flow of the program. When you use a framework, the flow is controlled by the framework.


### 2.2 - Imperative vs Declarative Programming

**Imperative** code focuses on writing an **explicit sequence of commands**.

**Declarative** code focuses on **specifying the result** of what you want.

> HOW vs WHAT

### 2.3 - Sorting algos

<3:
- quick sort: select a pivot value, sort all values < pivot to the left of it, and all > pivot to the right, and the sub-lists are recursively sorted.
- merge sort: compare and sort every two elements, merge them into lists of four, sort them, and keep going until everything is merged. It's a bubble sort that works in sections rather than going through the whole list.
- radix sort: non-comparative, places numbers in "buckets" according to the least or most significant digit. Each bucket is then sorted with another algo or recursively.


## 3 - Prep

- [ ] Web App Architecture
- [ ] Django
- [ ] React
- [ ] Set up dev environment --> JS + Python
- [ ] Node
- [ ] Vue.js
- [ ] Design patterns


## 4 - Presentation

### 4.1 - Who am i?

- commence le developement a l'ecole 42, ou j'ai pu realiser de nombreux projets en C, notamment de l'algo, de l'imagerie 3D from scratch, bas niveau.<br>ca m'a permi d'acquerir une bonne connaissance de la machine, et des concepts fondamentaux de la programation -> algos essentiels, compilation, bonnes pratiques.
- envie de me specialiser dans le web --> appris en solo + formation fullstack a Ironhack pour approfondir et valoriser mes competences. j'y ai eu un titre RNCP de niveau 6.<br>Stac MERN: MongoDB, express, React et Node. Plusieurs apps et API, projet final compagnon ACNH avec une API pour la data des creatures qu'on attrape dans le jeux.
- 1an a XMCO - societe de conseil en cybersecurite. Travail sur la plateforme d'echange entre le cert et ses clients.

Projets perso + stack --> ekans + mereader

Maitrise:
JS/TS  -  front et back --> node.js, react, angular, pug.js
Python -  back --> flask, eve, redis
BDD    -  MongoDB, bases en SQL


### 4.2 - XMCO

front Angular/Typescript.

back Python/Flask/Eve.

Maintient, resolution de bugs, resolution de dette technique sur le front et le back.

Integration de la nouvelle version du score CVSS (mesure les vulnerabilites).
- refactor du modele de data poour les CVE (vulnerabilites) --> flexibilite sur le design donc j'ai fait qqchose de modulR pour que les prochaines versions puissent etre integrees automatiquement.
- script chrone pour recuperer les nouvelles CVEs depuis une nouvelle API + nouveau scrapper et TUs
- script de traitement de l'existant

Refactor des comptes clients et des autorisations d'acces pour permettre a des parties tierces de gerer les abonnements de clients finaux.
- revue du model des donnees clientes.
- ajouts de limites par ex sur le nombre d'objets lies a un client.
- appris le travail en colab avec des personnes non-techniques


Decide de partir pcq j'avais l'impression d'avoir fait le tour du projet, envie d'apprendre de nouvelles technos et pas d'evolution


### 4.3 - Ce que je cherche

Un poste a Paris, avec du TT qui me propose de nouveux defis techniques et de continuer a developper mes competences. Bonus si le taff a un sens.


### 4.4 - Questions

- quelle stack tech
- a quels types de projets s'attendre 
- ou se situent les locaux


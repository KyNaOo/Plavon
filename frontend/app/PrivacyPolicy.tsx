import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function PrivacyPolicy() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Politique de confidentialité</Text>
      <Text style={styles.containerT}>
      Politique de Confidentialité
      </Text>
      <Text style={styles.containerT}>
      Introduction
</Text>

<Text style={styles.container}>
Cette politique de confidentialité régit la manière dont notre application mobile
“Plavon” collecte, utilise, conserve et divulgue les informations collectées auprès
des utilisateurs. Cette politique de confidentialité s'applique à l'Application et à
tous les produits et services offerts par notre équipe de projet.
</Text>

<Text style={styles.containerT}>
Collecte des Informations Personnelles
</Text>

<Text style={styles.container}>
Nous pouvons collecter des informations personnelles des Utilisateurs de
différentes manières, y compris, mais sans s'y limiter, lorsque les Utilisateurs se
connectent à notre Application, s'inscrivent sur l'Application, remplissent un
formulaire, et en relation avec d'autres activités, services, fonctionnalités ou
ressources que nous mettons à disposition sur notre Application.
</Text>

<Text style={styles.containerT}>
Informations d'Identification Personnelle
</Text>

<Text style={styles.container}>
Nous pouvons recueillir des informations d'identification personnelle auprès des
Utilisateurs de diverses manières, y compris, mais sans s'y limiter, lorsque les
Utilisateurs visitent notre Application, s'inscrivent sur l'Application, et en lien avec
d'autres activités, services, fonctionnalités ou ressources que nous mettons à
disposition sur notre Application. Les Utilisateurs peuvent être invités à fournir leur
nom, adresse électronique, photo de profil, et d'autres informations pertinentes.
Les Utilisateurs peuvent, cependant, visiter notre Application de manière
anonyme. Nous ne recueillerons des informations d'identification personnelle
auprès des Utilisateurs que s'ils nous les soumettent volontairement. Les
Utilisateurs peuvent toujours refuser de fournir des informations d'identification
personnelle, sauf que cela peut les empêcher de s'engager dans certaines
activités liées à l'Application.
</Text>

<Text style={styles.containerT}>
Informations d'Identification Non Personnelle
</Text>

<Text style={styles.container}>
Nous pouvons collecter des informations d'identification non personnelle sur les
Utilisateurs chaque fois qu'ils interagissent avec notre Application. Les
Untitled
1informations d'identification non personnelle peuvent inclure le nom du
navigateur, le type d'ordinateur et des informations techniques sur les moyens de
connexion des Utilisateurs à notre Application, comme le système d'exploitation et
les fournisseurs de services Internet utilisés et d'autres informations similaires.
</Text>

<Text style={styles.containerT}>
Cookies de Navigateur Web
</Text>

<Text style={styles.container}>
Notre Application peut utiliser des "cookies" pour améliorer l'expérience
Utilisateur. Le navigateur web de l'Utilisateur place des cookies sur son disque dur
à des fins de tenue de registres et parfois pour suivre des informations les
concernant. L'Utilisateur peut choisir de configurer son navigateur web pour
refuser les cookies, ou pour être alerté lorsque des cookies sont envoyés. Si ces
derniers le font, notez que certaines parties de l'Application peuvent ne pas
fonctionner correctement.
</Text>

<Text style={styles.containerT}>
Utilisation des Informations Collectées
</Text>

<Text style={styles.container}>
Notre Application peut collecter et utiliser les informations personnelles des
Utilisateurs pour les raisons suivantes :
Pour améliorer le service client : Les informations fournies nous aident à
répondre plus efficacement à vos demandes de service client et à vos besoins
de support.
Pour personnaliser l'expérience Utilisateur : Nous pouvons utiliser les
informations agrégées pour comprendre comment nos Utilisateurs en tant que
groupe utilisent les services et ressources fournis sur notre Application.
Pour améliorer notre Application : Nous pouvons utiliser les retours que vous
fournissez pour améliorer nos produits et services.
Pour planifier et organiser des événements : Utiliser les informations pour
organiser et synchroniser des activités et événements basés sur les
préférences et disponibilités des Utilisateurs.
Pour envoyer des emails périodiques : Nous pouvons utiliser l'adresse email
pour envoyer des informations et des mises à jour concernant les
événements. Elle peut également être utilisée pour répondre à leurs
demandes, questions, et/ou autres requêtes.
Untitled
</Text>


<Text style={styles.containerT}>
Protection de vos Informations
</Text>

<Text style={styles.container}>
Nous adoptons des pratiques de collecte, de stockage et de traitement des
données appropriées et des mesures de sécurité pour nous protéger contre
l'accès non autorisé, la modification, la divulgation ou la destruction de vos
informations personnelles, nom d'utilisateur, mot de passe, informations de
transaction et données stockées sur notre Application.
</Text>

<Text style={styles.containerT}>
Partage de vos Informations Personnelles
</Text>

<Text style={styles.container}>
Nous ne vendons, n'échangeons ni ne louons les informations d'identification
personnelle des Utilisateurs à des tiers. Nous pouvons partager des informations
démographiques agrégées génériques non liées à des informations
d'identification personnelle concernant les visiteurs et les Utilisateurs avec nos
partenaires commerciaux, les affiliés de confiance et les annonceurs pour les
finalités mentionnées ci-dessus.
</Text>

<Text style={styles.containerT}>
Modifications de cette Politique de Confidentialité
</Text>

<Text style={styles.container}>
Notre équipe a le pouvoir discrétionnaire de mettre à jour cette politique de
confidentialité à tout moment. Lorsque nous le ferons, nous réviserons la date
mise à jour au bas de cette page. Nous encourageons les Utilisateurs à vérifier
fréquemment cette page pour toute modification afin de rester informés sur la
façon dont nous aidons à protéger les informations personnelles que nous
collectons. Vous reconnaissez et acceptez qu'il est de votre responsabilité de
revoir cette politique de confidentialité périodiquement et de prendre conscience
des modifications.
</Text>

<Text style={styles.containerT}>
Votre Acceptation de ces Termes
</Text>

<Text style={styles.container}>
En utilisant cette Application, vous signifiez votre acceptation de cette politique. Si
vous n'acceptez pas cette politique, veuillez ne pas utiliser notre Application.
Votre utilisation continue de l'Application après la publication de modifications à
cette politique sera considérée comme votre acceptation de ces modifications.
Nous Contacter
Untitled
3Si vous avez des questions concernant cette politique de confidentialité, les
pratiques de cette Application ou vos interactions avec cette Application, veuillez
nous contacter à :
Plavon
contact@plavon.fr
Dernière mise à jour : 25/06/202
</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    fontFamily: "PoppinsRegular"
  },
  containerT: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    fontFamily: "PoppinsBold"
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});
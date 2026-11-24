/* Espace direction SACRI : données de démonstration (réunions, écarts de procédure, veille).
   Postes seulement, aucun nom de salarié, de client réel ni de concurrent réel. */
var DIR=window.DIR={
/* ---------- réunions de la semaine du 16 au 20 novembre 2026 ---------- */
reunions:[
 {id:"R1",type:"codir",titre:"Comité de direction",date:"2026-11-16",heure:"8 h 30",soc:"Groupe",anim:"Directeur général",suivante:"2026-11-23",
  points:[
   {p:"Trésorerie DEFI et SAFIR : plan pour le creux de janvier et février",soc:"DEFI, SAFIR",st:"aborde",dec:"Avancer les encaissements DEFI ; étudier une avance du groupe pour SAFIR",resp:"Direction financière",ech:"2026-12-15"},
   {p:"Impayés de plus de 60 jours : liste des 7 factures au dernier rappel",soc:"Groupe",st:"aborde",dec:"Mise en demeure pour 3 dossiers, échéancier proposé pour 4",resp:"Direction financière",ech:"2026-11-27"},
   {p:"Appel d'offres reboisement : caution de soumission",soc:"SACRI",st:"aborde",dec:"Caution validée, dossier à déposer avant le 21/11",resp:"Direction commerciale",ech:"2026-11-21"},
   {p:"Préparation du budget 2027 : calendrier des remontées par société",soc:"Groupe",st:"non",motif:"Ordre du jour dépassé",resp:"Direction financière",ech:"2026-11-23"},
   {p:"Bilan sécurité atelier : port des équipements de protection",soc:"SACRI, PST-CI",st:"aborde",dec:"Contrôle inopiné chaque semaine par le chef d'atelier",resp:"Responsable QHSE",ech:"2026-11-30"}]},
 {id:"R2",type:"com",titre:"Réunion commerciale",date:"2026-11-17",heure:"9 h",soc:"Groupe",anim:"Directeur commercial",suivante:"2026-11-24",
  points:[
   {p:"Les 7 devis dont la relance est dépassée",soc:"Groupe",st:"aborde",dec:"Relance de chaque devis par son commercial d'ici vendredi",resp:"Commerciaux terrain",ech:"2026-11-20"},
   {p:"Taux de transformation des devis par commercial",soc:"Groupe",st:"non",motif:"Chiffres non préparés",resp:"Assistante commerciale",ech:"2026-11-24"},
   {p:"Retour du salon professionnel : contacts à recontacter",soc:"SACRI",st:"non",motif:"Point oublié",resp:"Directeur commercial",ech:"2026-11-24"},
   {p:"Offre groupée tronçonneuses pour les exploitants forestiers",soc:"SACRI",st:"aborde",dec:"Proposition à présenter au prochain comité",resp:"Chef produit STIHL",ech:"2026-11-23"},
   {p:"Clients mines : visites de la quinzaine",soc:"DEFI, Trans-Roulements",st:"aborde",dec:"4 visites planifiées",resp:"Commerciaux terrain",ech:"2026-11-30"},
   {p:"Remise demandée sur le devis de la mine aurifère",soc:"DEFI",st:"reporte",motif:"En attente de l'avis de la direction générale",resp:"Directeur commercial",ech:"2026-11-21"}]},
 {id:"R3",type:"atelier",titre:"Point atelier",date:"2026-11-18",heure:"15 h",soc:"SACRI, PST-CI",anim:"Directeur des opérations",suivante:"2026-11-25",
  points:[
   {p:"Pompe hydraulique en atelier depuis 21 jours",soc:"PST-CI",st:"aborde",dec:"Date ferme donnée au client avant vendredi",resp:"Chef d'atelier PST-CI",ech:"2026-11-20"},
   {p:"Machines prêtes non retirées : rappel des clients",soc:"SACRI",st:"aborde",dec:"Appel de chaque client sous 48 heures",resp:"Service client",ech:"2026-11-20"},
   {p:"Pièces en rupture qui bloquent des réparations",soc:"SACRI, PST-CI",st:"non",motif:"Responsable achats absent",resp:"Service achats",ech:"2026-11-25"},
   {p:"Fiche de réception des machines : champs manquants",soc:"SACRI",st:"aborde",dec:"Fiche complétée à chaque dépôt, contrôle par le chef d'atelier",resp:"Chef d'atelier SACRI",ech:"2026-11-30"}]},
 {id:"R4",type:"codir",titre:"Comité de direction",date:"2026-11-23",heure:"8 h 30",soc:"Groupe",anim:"Directeur général",prevue:true,
  points:[
   {p:"Préparation du budget 2027 : calendrier des remontées par société",soc:"Groupe",st:"prevu",relance:true,resp:"Direction financière"},
   {p:"Offre groupée tronçonneuses : décision",soc:"SACRI",st:"prevu",resp:"Chef produit STIHL"},
   {p:"Écarts de procédure du mois : synthèse par service",soc:"Groupe",st:"prevu",resp:"Responsable QHSE"},
   {p:"Veille concurrents : synthèse du mardi",soc:"Groupe",st:"prevu",resp:"Directeur commercial"}]},
 {id:"R5",type:"com",titre:"Réunion commerciale",date:"2026-11-24",heure:"9 h",soc:"Groupe",anim:"Directeur commercial",prevue:true,
  points:[
   {p:"Taux de transformation des devis par commercial",soc:"Groupe",st:"prevu",relance:true,resp:"Assistante commerciale"},
   {p:"Retour du salon professionnel : contacts à recontacter",soc:"SACRI",st:"prevu",relance:true,resp:"Directeur commercial"},
   {p:"Suite des relances des 7 devis",soc:"Groupe",st:"prevu",resp:"Commerciaux terrain"}]},
 {id:"R6",type:"atelier",titre:"Point atelier",date:"2026-11-25",heure:"15 h",soc:"SACRI, PST-CI",anim:"Directeur des opérations",prevue:true,
  points:[
   {p:"Pièces en rupture qui bloquent des réparations",soc:"SACRI, PST-CI",st:"prevu",relance:true,resp:"Service achats"},
   {p:"Délai de réparation des compresseurs",soc:"PST-CI",st:"prevu",resp:"Chef d'atelier PST-CI"}]}
],
/* points abordés ou non sur les 8 dernières semaines (réunions tenues), pour la tendance */
hist_sem:["28/09","05/10","12/10","19/10","26/10","02/11","09/11","16/11"],
hist_aborde:[11,12,10,13,11,12,13,10],
hist_non:[4,3,5,2,4,3,2,5],
hist_rattrape:[3,3,4,2,3,3,2,0],

/* ---------- écarts de procédure, 2026 ---------- */
services:["Commercial","Atelier","Magasin et achats","Service client","Finance","Transit"],
procedures:{
 "Commercial":["Relance des devis à J+7","Accord de remise au-delà du plafond","Compte rendu de visite client"],
 "Atelier":["Fiche de réception de la machine","Devis avant réparation","Port des équipements de protection"],
 "Magasin et achats":["Inventaire tournant hebdomadaire","Réserve à la réception","Commande au seuil de réapprovisionnement"],
 "Service client":["Réponse dans le délai visé","Transmission au bon service","Rappel du client à la remise"],
 "Finance":["Relance des impayés à 30, 45 et 60 jours","Double signature des paiements","Rapprochement bancaire hebdomadaire"],
 "Transit":["Contrôle des documents avant l'arrivée","Suivi des envois chaque semaine"]
},
ecarts:[
 {d:"2026-11-18",svc:"Atelier",soc:"PST-CI",poste:"Technicien atelier",proc:"Devis avant réparation",ecart:"Réparation commencée sans accord écrit du client",suite:"Rappel de la règle, accord régularisé",niv:"moyen",st:"clos"},
 {d:"2026-11-17",svc:"Commercial",soc:"SACRI",poste:"Commercial terrain",proc:"Relance des devis à J+7",ecart:"3 devis sans relance depuis plus de 15 jours",suite:"Relances faites, point en réunion commerciale",niv:"moyen",st:"suivi"},
 {d:"2026-11-15",svc:"Magasin et achats",soc:"SACRI",poste:"Magasinier",proc:"Réserve à la réception",ecart:"Livraison incomplète acceptée sans réserve écrite",suite:"Réserve envoyée au fournisseur",niv:"moyen",st:"suivi"},
 {d:"2026-11-14",svc:"Finance",soc:"Trans-Roulements",poste:"Comptable",proc:"Relance des impayés à 30, 45 et 60 jours",ecart:"Relance à 45 jours non envoyée pour 2 factures",suite:"Relance envoyée, calendrier rappelé",niv:"faible",st:"clos"},
 {d:"2026-11-13",svc:"Atelier",soc:"SACRI",poste:"Technicien atelier",proc:"Port des équipements de protection",ecart:"Meulage sans lunettes de protection",suite:"Avertissement oral, contrôle renforcé",niv:"fort",st:"clos"},
 {d:"2026-11-12",svc:"Transit",soc:"DEFI",poste:"Agent de transit",proc:"Contrôle des documents avant l'arrivée",ecart:"Certificat d'origine non demandé avant l'arrivée de l'envoi aérien",suite:"Documents demandés, envoi bloqué en douane",niv:"fort",st:"suivi"},
 {d:"2026-11-11",svc:"Service client",soc:"PST-CI",poste:"Chargé de clientèle",proc:"Réponse dans le délai visé",ecart:"Demande par e-mail restée 3 jours sans réponse",suite:"Réponse faite, demande ajoutée au suivi quotidien",niv:"faible",st:"clos"},
 {d:"2026-11-10",svc:"Commercial",soc:"DEFI",poste:"Commercial grands comptes",proc:"Accord de remise au-delà du plafond",ecart:"Remise annoncée au client avant l'accord de la direction",suite:"Dossier soumis à la direction générale",niv:"fort",st:"suivi"},
 {d:"2026-11-06",svc:"Atelier",soc:"SACRI",poste:"Réceptionnaire atelier",proc:"Fiche de réception de la machine",ecart:"Numéro de série non relevé sur 2 machines",suite:"Fiches complétées",niv:"faible",st:"clos"},
 {d:"2026-11-05",svc:"Magasin et achats",soc:"Trans-Roulements",poste:"Acheteur",proc:"Commande au seuil de réapprovisionnement",ecart:"Paliers sous le seuil sans commande lancée",suite:"Commande à valider en comité",niv:"moyen",st:"suivi"},
 {d:"2026-11-03",svc:"Finance",soc:"SAFIR",poste:"Comptable",proc:"Rapprochement bancaire hebdomadaire",ecart:"Rapprochement de la semaine 44 non fait",suite:"Fait avec 4 jours de retard",niv:"faible",st:"clos"},
 {d:"2026-10-30",svc:"Service client",soc:"SACRI",poste:"Chargé de clientèle",proc:"Rappel du client à la remise",ecart:"Client non rappelé, machine prête depuis 8 jours",suite:"Client rappelé, machine retirée",niv:"faible",st:"clos"},
 {d:"2026-10-27",svc:"Commercial",soc:"PST-CI",poste:"Commercial terrain",proc:"Compte rendu de visite client",ecart:"4 visites sans compte rendu",suite:"Comptes rendus faits",niv:"faible",st:"clos"},
 {d:"2026-10-22",svc:"Finance",soc:"DEFI",poste:"Responsable administratif",proc:"Double signature des paiements",ecart:"Paiement fournisseur signé par une seule personne",suite:"Contrôle a posteriori, règle rappelée par écrit",niv:"fort",st:"clos"},
 {d:"2026-10-16",svc:"Atelier",soc:"PST-CI",poste:"Technicien atelier",proc:"Port des équipements de protection",ecart:"Gants absents lors d'un essai sous pression",suite:"Avertissement oral",niv:"moyen",st:"clos"},
 {d:"2026-10-14",svc:"Commercial",soc:"Trans-Roulements",poste:"Commercial sédentaire",proc:"Relance des devis à J+7",ecart:"2 devis relancés après 12 jours",suite:"Rappel de la règle",niv:"faible",st:"clos"},
 {d:"2026-10-12",svc:"Magasin et achats",soc:"PST-CI",poste:"Acheteur",proc:"Commande au seuil de réapprovisionnement",ecart:"Joints hydrauliques sous le seuil sans commande",suite:"Commande passée",niv:"moyen",st:"clos"},
 {d:"2026-10-07",svc:"Atelier",soc:"SACRI",poste:"Réceptionnaire atelier",proc:"Fiche de réception de la machine",ecart:"Accessoires déposés non inscrits sur la fiche",suite:"Fiche corrigée avec le client",niv:"faible",st:"clos"},
 {d:"2026-10-09",svc:"Magasin et achats",soc:"SACRI",poste:"Magasinier",proc:"Inventaire tournant hebdomadaire",ecart:"Inventaire de la semaine 41 non fait",suite:"Rattrapé la semaine suivante",niv:"faible",st:"clos"}
],
/* cumul annuel par service et par mois (janvier à novembre 2026, novembre au 19) */
cumul_mois:["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov."],
cumul:{
 "Commercial":[2,1,3,2,2,1,3,2,3,2,2],
 "Atelier":[3,2,2,3,1,2,2,1,2,2,3],
 "Magasin et achats":[1,2,1,1,2,1,2,2,1,2,2],
 "Service client":[1,1,2,1,1,1,0,1,2,1,1],
 "Finance":[0,1,1,0,1,0,1,1,0,1,2],
 "Transit":[1,0,1,1,0,1,1,0,1,0,1]
},
/* gravité des écarts de l'année, par service : [faible, moyen, fort] */
gravite:{
 "Commercial":[13,8,2],"Atelier":[11,8,4],"Magasin et achats":[11,5,1],"Service client":[10,2,0],"Finance":[5,1,2],"Transit":[4,1,2]
},
/* ---------- veille concurrents : synthèse du mardi 17 novembre ---------- */
veille:{
 date:"2026-11-17",semaine:"semaine du 16 novembre",
 faits:[
  {d:"2026-11-12",qui:"Importateur de matériel forestier (marque concurrente de STIHL)",cat:"Offre",soc:"SACRI",fait:"Annonce une offre « tronçonneuse et entretien d'un an » pour les exploitants forestiers, diffusée sur les réseaux sociaux.",impact:"haut",suite:"Comparer avec notre offre groupée, décision au comité du 23/11"},
  {d:"2026-11-13",qui:"Distributeur régional de roulements",cat:"Réseau",soc:"Trans-Roulements",fait:"Ouvre un point de vente à San-Pédro, près de la zone portuaire.",impact:"moyen",suite:"Recenser nos clients de la région ouest"},
  {d:"2026-11-14",qui:"Atelier indépendant d'hydraulique",cat:"Service",soc:"PST-CI",fait:"Propose un diagnostic sur site sous 24 heures pour les pompes et vérins.",impact:"moyen",suite:"Évaluer un service de diagnostic sur site"},
  {d:"2026-11-16",qui:"Exposants du salon SIREXE",cat:"Salon",soc:"Groupe",fait:"Trois exposants du secteur ont présenté des machines sur batterie ; forte affluence des collectivités sur ces stands.",impact:"bas",suite:"Point à inscrire au comité de décembre"}
 ],
 sources:["Réseaux sociaux","Salon SIREXE","Remontées des commerciaux","Presse économique"]
}
};

/* ---------- reprise de l'espace existant (chiffres inchangés) ---------- */
DIR.dg_dec=[
 {id:"G1",titre:"Relancer 7 devis en retard de relance",det:"24,1 M FCFA de devis envoyés sans relance à la date prévue, le plus ancien depuis le 31/10.",soc:"Groupe",resp:"Direction commerciale",quand:"En retard",late:1,ico:"send",acts:["Lancer la relance","Déléguer"]},
 {id:"G2",titre:"Préparer DEFI et SAFIR au creux de janvier et février",det:"DEFI passe sous son seuil de 8 M le 11/02, SAFIR sous son seuil de 3 M dès le 28/01.",soc:"DEFI, SAFIR",resp:"Direction financière",quand:"Avant le 15/12",ico:"wallet",acts:["Avancer les encaissements","Prévoir une avance groupe"]},
 {id:"G3",titre:"Statuer sur 7 factures au dernier rappel",det:"14,2 M FCFA impayés depuis plus de 60 jours, sur 4 sociétés.",soc:"SACRI, Trans-Roulements, SAFIR, PST-CI",resp:"Direction générale",quand:"Cette semaine",ico:"hand-coins",acts:["Mise en demeure","Proposer un échéancier"]},
 {id:"G4",titre:"Payer la proforma Hitachi",det:"780 000 FCFA. Charbons pour meuleuse en rupture chez SACRI.",soc:"SACRI",resp:"Service achats",quand:"Pour le 20/11",ico:"receipt",acts:["Valider le paiement","Refuser"]}
];
DIR.do_act=[
 {id:"O1",titre:"Pompe hydraulique en atelier depuis 21 jours",det:"Client agricole, devis accepté de 610 000 FCFA. Délai visé : 12 jours. Donner une date ferme au client.",soc:"PST-CI",resp:"Chef d'atelier PST-CI",quand:"En retard depuis le 10/11",late:1,ico:"wrench",acts:["Fixer la date","Prévenir le client"]},
 {id:"O2",titre:"Documents manquants, envoi Parker",det:"Arrivée le 15/11 : colisage, certificat d'origine et attestation de chargement à obtenir pour dédouaner.",soc:"DEFI, PST-CI",resp:"Transit",quand:"Bloque la livraison",late:1,ico:"file-warning",acts:["Relancer le fournisseur","Relancer le transitaire"]},
 {id:"O3",titre:"Départ non confirmé, Paulstra et Sauer Danfoss",det:"Vol prévu le 17/11, aucune confirmation.",soc:"PST-CI, Trans-Roulements",resp:"Transit",quand:"Depuis le 17/11",ico:"ship",acts:["Relancer le transitaire"]},
 {id:"O4",titre:"Réception incomplète : têtes de débroussailleuse",det:"36 reçues sur 40 le 13/11. Réserve à faire au fournisseur.",soc:"SACRI",resp:"Magasin SACRI",quand:"À faire",ico:"package",acts:["Envoyer la réserve"]},
 {id:"O5",titre:"8 articles à commander",det:"17 875 900 FCFA au total, dont meules CBN pour SAFIR et paliers UCP 208 pour Trans-Roulements.",soc:"SACRI, Trans-Roulements, SAFIR, PST-CI",resp:"Service achats",quand:"Cette semaine",ico:"clipboard-list",acts:["Préparer les commandes"]}
];
DIR.ruptures=[
 {des:"Chaîne de tronçonneuse 3/8\" 63 cm",soc:"SACRI",conso:"38 vendues par mois",st:["b","Réappro le 11/12"]},
 {des:"Charbons pour meuleuse",soc:"SACRI",conso:"14 paires par mois",st:["o","Proforma à payer"]},
 {des:"Palier semelle UCP 208",soc:"Trans-Roulements",conso:"7 par mois",st:["r","Aucune commande"]},
 {des:"Meule d'affûtage CBN",soc:"SAFIR",conso:"4 par mois",st:["r","Aucune commande"]},
 {des:"Kit joints pompe hydraulique",soc:"PST-CI",conso:"3 kits par mois",st:["a","Départ non confirmé"]}
];
DIR.imports=[
 {four:"STIHL",mode:"Conteneur 20'",socs:"SACRI",val:5.2,etape:5,st:["g","Livré"]},
 {four:"NTN-SNR, Optibelt",mode:"Groupage",socs:"Trans-Roulements",val:1.9,etape:3,st:["b","En douane"]},
 {four:"Parker",mode:"Avion",socs:"DEFI, PST-CI",val:2.0,etape:3,st:["r","Documents manquants"]},
 {four:"STIHL, Beta",mode:"Conteneur 40'",socs:"SACRI",val:4.4,etape:2,st:["a","Retard de 4 jours"]},
 {four:"Paulstra, Sauer Danfoss",mode:"Avion",socs:"PST-CI, Trans-Roulements",val:0.6,etape:1,st:["r","Départ non confirmé"]},
 {four:"Tyrolit, Uddeholm",mode:"Groupage",socs:"DEFI, SAFIR",val:5.2,etape:2,st:["a","Retard de 4 jours"]}
];
/* atelier : machines par étape et par société (16 au total, dont 3 en retard) */
DIR.atelier_etapes=["Diagnostic","Devis envoyé","Attente de pièce","En réparation","Prête"];
DIR.atelier={"SACRI":[3,1,1,2,2],"PST-CI":[1,2,1,2,1],"DEFI":[0,0,0,0,0],"Trans-Roulements":[0,0,0,0,0],"SAFIR":[0,0,0,0,0]};
DIR.veille_hist={sem:["29/09","06/10","13/10","20/10","27/10","03/11","10/11","17/11"],haut:[0,1,0,0,1,0,0,1],moyen:[2,1,2,1,1,2,1,2],bas:[1,2,1,2,1,1,2,1]};
/* écarts de janvier à septembre : [mois, service, société, gravité] (registre détaillé archivé) */
DIR.anc=[[0,0,0,1],[0,0,1,0],[1,0,3,2],[2,0,0,1],[2,0,0,0],[2,0,2,0],[3,0,4,1],[3,0,1,0],[4,0,1,0],[4,0,4,0],[5,0,0,0],[6,0,4,1],[6,0,0,0],[6,0,0,1],[7,0,0,1],[7,0,0,0],[8,0,3,1],[8,0,0,0],[8,0,1,0],[0,1,0,1],[0,1,0,2],[0,1,0,1],[1,1,4,0],[1,1,0,1],[2,1,0,0],[2,1,0,0],[3,1,0,0],[3,1,0,2],[3,1,4,1],[4,1,0,0],[5,1,0,1],[5,1,0,0],[6,1,0,2],[6,1,4,0],[7,1,0,0],[8,1,4,1],[8,1,0,0],[0,2,2,2],[1,2,0,0],[1,2,3,0],[2,2,0,0],[3,2,2,0],[4,2,2,0],[4,2,1,0],[5,2,2,0],[6,2,4,1],[6,2,0,1],[7,2,4,0],[7,2,0,0],[8,2,2,0],[0,3,4,1],[1,3,1,0],[2,3,0,1],[2,3,0,0],[3,3,0,0],[4,3,0,0],[5,3,0,0],[7,3,2,0],[8,3,3,0],[8,3,4,0],[1,4,0,2],[2,4,0,0],[4,4,0,0],[6,4,1,0],[7,4,2,1],[0,5,2,1],[2,5,2,0],[3,5,1,0],[5,5,0,0],[6,5,4,2],[8,5,4,0]];
DIR.sav={reponse_h:4.0,dans_delai:82,attente:1,recus:21};

/* ---------- veille concurrents : bilan du 3e trimestre 2026 (juillet à septembre) ----------
   f : [mois, type de concurrent, sujet, impact (0 faible, 1 moyen, 2 fort), société concernée] */
DIR.veille_t3={"f":[[7,0,1,0,"SACRI"],[7,0,3,0,"SACRI"],[7,1,1,0,"Trans-Roulements"],[7,1,1,0,"Trans-Roulements"],[7,2,1,0,"PST-CI"],[7,2,3,1,"PST-CI"],[7,3,0,1,"SACRI"],[7,3,0,0,"SAFIR"],[7,3,1,2,"SACRI"],[7,3,1,0,"SAFIR"],[8,0,0,1,"SACRI"],[8,0,0,1,"SAFIR"],[8,0,1,2,"SACRI"],[8,0,1,1,"SAFIR"],[8,1,1,0,"DEFI"],[8,1,5,1,"Trans-Roulements"],[8,2,3,1,"PST-CI"],[8,4,2,1,"DEFI"],[8,4,5,0,"DEFI"],[9,0,0,2,"SACRI"],[9,0,0,0,"SACRI"],[9,0,2,1,"SACRI"],[9,0,4,1,"SACRI"],[9,0,4,1,"SACRI"],[9,1,0,0,"Trans-Roulements"],[9,1,1,0,"Trans-Roulements"],[9,1,2,2,"Trans-Roulements"],[9,1,2,1,"Trans-Roulements"],[9,1,2,1,"DEFI"],[9,1,4,1,"Trans-Roulements"],[9,2,3,2,"PST-CI"],[9,2,3,0,"PST-CI"],[9,2,3,0,"PST-CI"],[9,2,5,0,"PST-CI"],[9,2,5,0,"PST-CI"],[9,3,1,0,"SACRI"],[9,4,0,0,"DEFI"],[9,4,4,2,"DEFI"]]};
Object.assign(DIR.veille_t3,{
 types:[["Importateurs de marques concurrentes","Importateurs","boxes"],["Distributeurs régionaux","Distributeurs","truck"],["Ateliers indépendants","Ateliers","wrench"],["Revendeurs en ligne","En ligne","globe"],["Nouveaux entrants","Nouveaux","sparkles"]],
 sujets:[["Offre","megaphone"],["Prix","tag"],["Réseau","map-pin"],["Service","wrench"],["Salon","store"],["Recrutement","user-plus"]],
 t2:{mois:["avr.","mai","juin"],faits:[8,9,11],fort:[1,2,1]},
 decisions:5,
 mouvements:[
  {ico:"tag",c:"#EF4444",sujet:"Prix",mois:"Août",type:"Importateur de marques concurrentes",soc:"SACRI",fait:"Baisse de 12 % sur les tronçonneuses d'entrée de gamme, juste avant la saison forestière.",impact:"Ventes de tronçonneuses à risque sur la saison",suite:"Prix alignés sur 3 modèles, décision du comité du 08/09"},
  {ico:"map-pin",c:"#0EA5E9",sujet:"Réseau",mois:"Septembre",type:"Distributeur régional",soc:"Trans-Roulements",fait:"Ouvre deux points de vente, à Yamoussoukro et à Daloa.",impact:"Clients du centre-ouest exposés",suite:"Tournée commerciale faite, dépositaire à l'étude"},
  {ico:"wrench",c:"#10B981",sujet:"Service",mois:"Septembre",type:"Atelier indépendant",soc:"PST-CI",fait:"Lance un contrat d'entretien annuel des pompes et vérins, et recrute des techniciens.",impact:"Clients d'atelier sollicités",suite:"Notre contrat d'entretien lancé le 01/10"}
 ],
 reponses:[
  {ico:"tag",t:"Alignement des prix sur 3 tronçonneuses d'entrée de gamme",soc:"SACRI",d:"Appliqué depuis le 15/09",st:["g","circle-check","Fait"]},
  {ico:"file-check",t:"Contrat d'entretien annuel pour pompes et vérins",soc:"PST-CI",d:"Lancé le 01/10, 9 contrats signés",st:["b","activity","En cours"]},
  {ico:"map-pin",t:"Dépositaire au centre-ouest, face aux deux nouveaux points de vente",soc:"Trans-Roulements",d:"Étude remise au comité du 08/12",st:["a","gavel","À décider"]}
 ]
});

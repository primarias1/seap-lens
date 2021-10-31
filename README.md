# SEAP-lens

## Motivație

[SEAP][seap] este Sistemul Electronic de Achiziții Publice, folosit de autoritățile 
locale pentru a pune la dispoziția publicului informații referitoare la
achizițiile publice.

[seap]: https://e-licitatie.ro/

SEAP este un sistem complex, care trebuie să gestioneze mai multe aspecte
ce țin de achizițiile publice. Printre acestea se numără:
* Lista de anunțuri pentru fiecare entitate publică în parte;
* Catalogul de servicii și produse ofertate de diverse companii private;
* Interacțiunea dintre entitățile publice și companiile private pentru achiziția 
  de servicii și produse.

Suplimentar, SEAP trebuie să gestioneze atât schimbările legislative, dar să 
permită și un grad suficient de mare de flexibilitate în cazul unor achiziții 
publice urgente, de exemplu.

Din păcate, această complexitate inerentă a sistemului face dificilă urmărirea
achizițiilor publice, atât cele viitoare cât și cele din trecut, mai ales că
achizițiile pot fi făcute de entități publice care au un ordonat principal de
credite diferit.

De exemplu, cineva care dorește să urmărească ce achiziții publice dorește să facă
Primăria Sectorului 1 trebuie să verifice:

* Lista cu anunțurile de intenție
* Invitațiile de participare
* Anunțurile de participare
* Anunțurile de participare simplificată
* Anunțurile de concurs de soluții
* Publicitatea de anunțuri

Fiecare tip de anunț se referă la un tip de procedură, iar generarea unei liste
cu toate tipruile de anunțuri nu este trivială (de exemplu, anumite proceduri pot
conține loturi, altele nu).

În plus, de multe ori există o diferență între ce înțelege publicul prin „instituție”
și cum este aceasta definită conform legii.

De exemplu, Primăria Sectorului 1 are codul CIF `4505359`, iar toate achizițiile
Primăriei Sectorului 1 apar în SEAP când se efectuează o căutare după acest CIF
(în SEAP denumirea este oficială este „RO 4505359 - Sector 1 (Sectorul 1 al 
municipiului Bucuresti)). Însă această entitate se referă doar la aparatul de
specialitate al Primarului Sectorului 1 și nu include următoarele entități care
sunt subordonate Consiliului Local Sector 1, dar care sunt finanțate din bugetul
local:

* Administrația Domeniului Public Sector 1 (CIF `4602068`)
* Direcția Generală de Impozite și Taxe Locale a Sectorului 1 (CIF `12293095`)
* Direcția Generală de Asistență Socială și Protecția Copilului Sector 1 (CIF `15318810`)
* Poliția Locală Sector 1 (CIF `17182756`)
* Complexul Multifuncțional Caraiman (CIF `23410107`)
* Direcția Utilități Publice Salubrizare și Protecția Mediului Sector 1 (CIF `41640678`)

Lista completă de entități publice, împreună cu informații despre operatorii de 
credite este disponibilă pe [site-ul ANAF][lista-entitati].

[lista-entitati]: https://extranet.anaf.mfinante.gov.ro/anaf/extranet/EXECUTIEBUGETARA/alte_rapoarte/alte_rapoarte2

Suplimentar, la nivel de Sector 1 mai există și două companii înființate de Consiliul 
Local Sector 1:

* CET Grivița SRL (CIF `15811175`)
* Compania de Investiții și Dezvoltare în Sănătate și Domenii de Interes Public-Privat 
  Sector 1 S.A. (CIF `40311936`)

Și acestea pot apărea în SEAP.

Așadar, efortul necesar pentru a înțelege cum sunt cheltuiți banii la nivelul 
unei primării nu este deloc trivial.

## Utilizare

Modulul generează un fișier JSON cu achizițiile viitoare sau deja efectuate
pentru o anumită entitate publică identificată printr-un CIF, incluzând și
entitățile pentru care aceasta e operator principal de credite.

```shell
$ seap-lens --for CIF [--include CIF ...] [--single] [-to FILENAME; default=entities.json]
$ seap-lens {--future|--past} [--on FILENAME; default=entities.json] [--to OUTPUT; default=data.json]
```

De exemplu, pentru a genera un fișier `data/primarias1.json` care să cuprindă
toate entitățile care sunt finanțate de la bugetul local al Sectorului 1:

```shell
$ seap-lens --for 4505359 --include 15811175 --include 40311936
$ seap-lens --on entities.json --future --to data/primarias1.json
```

### Extragerea ID-urilor pentru entitățile publice din SEAP

Entitățile publice se identifică cel mai ușor prin codul de identificare fiscală
(CIF), însă apelurile către API-ul de la SEAP necesită utilizarea ID-ului din 
baza de date a SEAP-ului, care diferă de CIF.

Sintaxa completă:

```shell
$ seap-lens --for CIF [--include CIF ...] [--single] [-to FILENAME; default=entities.json]
```

Rezultatul va fi un fișier JSON numit `entities.json`, generat în folderul 
curent.

Opțiunile reprezintă:
* `--for CIF` CIF-ul instituției publice care este operator principal de credite
* `-- include CIF` CIF suplimentar
* `--single` doar instituția publică specificată via `--for`, fără instituțiile
  pentru care aceasta e operator principal de credite
* `--to FILENAME` numele fișierului în care să se salveze mapările (valoarea default e `entities.json`)

> CIF-ul principal (setat prin opțiunea `--for CIF`) este folosit pentru a se afla
> CIF-urile entităților pentru care entitatea publică specificată este ordonator
> principal de credite. Pentru CIF-urile secundare (setate prin opțiunea 
> `--include CIF`), acest lucru nu este valabil.

De exemplu, pentru a se mapa toate instituțiile publice ce țin de Primăria
Sectorului 1:

```shell
$ seap-lens --for 4505359
```

Pentru a se include și CET Grivița și CIDSDIPP S1:

```shell
$ seap-lens --for 4505359 --include 15811175 --include 40311936
```

Pentru a se mapa exclusiv Administrația Domeniului Public Sectorul 1:

```shell
$ seap-lens --for 4602068 --single
```

### Extragerea informațiilor din SEAP

Informațiile extrase din SEAP grupează toate tipurile de anunțuri și toate tipurile 
de achiziții într-un format JSON care poate fi mai ușor de manipulat.

> Fișierul JSON nu va conține toate informațiile disponibile pentru o achiziție,
> însă este pus la dispoziție un câmp care conține URL-ul anunțului sau achiziției
> din SEAP și un alt câmp care conține URL-ul necesar pentru extragerea acestor
> date în mod programatic via API-ul public din SEAP.

Sintaxa completă:

```shell
$ seap-lens --on TYPE [--from FILENAME; default=entities.json] [--to OUTPUT; default=data.json]
```

Opțiunile reprezintă:
* `--on TYPE` tipul de achiziție (a se vedea mai jos pentru valori valide pentru `TYPE`)
* `--from FILENAME` fișierul generat la pasul anterior
* `--to OUTPUT` fișierul de ieșire cu datele obținute din SEAP

Informațiile care se extrag din SEAP pot fi de două tipuri:
* `future` - anunțurile de achiziții viitoare, pentru care termenul de depunere a
  ofertelor nu s-a încheiat
* `completed` - anunțuri de achiziții care au termenul de depunere a ofertelor a
  expirat
* `done` - achizițiile finalizate

## Schema JSON

TBD

## Licență

Codul sursă este distribuit sub licență [Eclipse Public License v2][epl-v2].

[epl-v2]: https://www.eclipse.org/legal/epl-2.0/
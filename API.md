# <b>Leistungsbeurteilung Teil B vom Modul 295
## Backend für eine ToDo Liste realisieren</b>
<br>

## Autor 
Nikola Antic

## Projektname
ToDo-List-Backend

## Setup
1. Repository klonen
2. Im Terminal öffnen und mit "npm run start" laufen lassen.

## Endpunkte
<b>GET /tasks</b>: gibt alle Aufgaben als JSON zurück.<br>
<b>POST /tasks</b>: fügt eine Aufgabe hinzu und gibt diese zurück.<br>
<b>GET /tasks/{id}</b>: gibt eine Aufgabe mit der id zurück.<br>
<b>PUT /tasks/{id}</b>: verändert eine Aufgabe und gibt sie zurück.<br>
<b>DELETE /tasks/{id}</b>: löscht eine Aufgabe mit der id und gibt die gelöschte Aufgabe zurück.

### Login
<b>POST /login</b>: Nimmt Credentials entgegen, überprüft diese und gibt ein Cookie zurück<br>
<b>GET /verify</b>: Überprüft ob das Cookie gültig ist. <br>
<b>DELETE /logout</b>: Markiert das Cookie als ungültig.



<style>
    b {color: skyblue}
</style>

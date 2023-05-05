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

## Runtime
Node Version 20.0


## Endpunkte
<table>
* Überprüfen ob man angemolden ist.<br>
# 403 wenn nicht authentifiziert
    <tr>
        <th>Endpunkt</th>
        <th>Beschreibung</th>
        <th>Erwatete Werte</th>
        <th>Validierungen</th>
        <th>Rückgabewerte</th>
        <th>Status</th>
    </tr>
    <tr>
        <td><b>GET /tasks</b></td>
        <td>Gibt alle Aufgaben als JSON zurück</td>
        <td>-</td>
        <td>*</td>
        <td>Alle Tasks als JSON</td>
        <td>200 | #</td>
    </tr>
    <tr>
        <td><b>GET /tasks/{id}</b></td>
        <td>Gibt eine Aufgabe mit der id zurück</td>
        <td>id als Parameter</td>
        <td>* & ob die id vorhanden ist</td>
        <td>task objekt mit der passenden id</td>
        <td>200 | # | 404</td>
    </tr>
    <tr>
        <td><b>POST /tasks</b></td>
        <td>Fügt eine Aufgabe hinzu und gibt diese zurück.</td>
        <td>task als JSON-Objekt mit attributen, id & title</td>
        <td>* & ob title nicht leer ist</td>
        <td>Neu erstellter task als JSON</td>
        <td>201 | # | 406</td>
    </tr>
    <tr>
        <td><b>PUT /tasks/{id}</b></td>
        <td>Verändert eine Aufgabe und gibt sie zurück</td>
        <td>id als Parameter und title als neuer Titel</td>
        <td>* & ob title nicht leer ist & ob die id existiert</td>
        <td>Der veränderte Task als JSON</td>
        <td>200 | # | 404 | 406</td>
    </tr>
    <tr>
        <td><b>DELETE /tasks/{id}</b></td>
        <td>Löscht eine Aufgabe mit der id und gibt die gelöschte Aufgabe zurück</td>
        <td>id als Parameter</td>
        <td>* & ob die id existiert</td>
        <td>Den gelöschten Task</td>
        <td>200 | # | 404</td>
    </tr>
    <tr>
        <td><b>POST /login</b></td>
        <td>Nimmt Credentials entgegen, überprüft diese und gibt ein Cookie zurück</td>
        <td>"email" und "password"</td>
        <td>Überprüft ob "password" gültig ist</td>
        <td>JSON Antwort mit Parametern "response" und "email"</td>
        <td>200 | 401</td>
    </tr>
    <tr>
        <td><b>GET /verify</b></td>
        <td>Überprüft ob das Cookie gültig ist</td>
        <td>"email" in der Session</td>
        <td>* & Überprüft ob das Cookie gültig ist</td>
        <td>JSON Antwort mit Parametern "message" und "email"</td>
        <td>200 | 401</td>
    </tr>
    <tr>
        <td><b>DELETE /logout</b></td>
        <td>Markiert das Cookie als ungültig</td>
        <td>"email" in der Session</td>
        <td>*</td>
        <td>Im Errorfall kommt eine JSON Antwort mit dem Attribut "error"</td>
        <td>204 | 401</td>
    </tr>
</table>


<style>
    b {color: skyblue}
</style>

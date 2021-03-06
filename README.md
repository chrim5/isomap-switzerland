<h1>IsoMap - Isochronenkarte der Schweizer Flughäfen</h1>

#### Semesterarbeit im Wahlfach Geoinformationssysteme an der BFH  
  
#### Marc Christen, Simon Schmid
---  

### Inhalt

- [Ziele](#ziele)
  - [Optionale Ziele](#optionale-ziele)
- [Vorgehen](#vorgehen)
  - [QGis - ORS Tools Plugin](#qgis---ors-tools-plugin)
    - [Aufbau](#aufbau)
    - [Verwendete Datenquellen](#verwendete-datenquellen)
    - [Verwendung des Plugins](#verwendung-des-plugins)
    - [Ergebnisse](#ergebnisse)
  - [OTP - OpenTripPlanner](#otp---opentripplanner)
  - [Evaluierung](#evaluierung)
    - [Webapplikation](#webapplikation)
  - [Aufbau](#aufbau-1)
    - [Ergebnisse](#ergebnisse-1)
  - [Quellen](#quellen)
    - [Software](#software)
    - [Daten und Schnittstellen](#daten-und-schnittstellen)
  - [Mögliche Probleme mit GTFS-Daten und OTP](#m%C3%B6gliche-probleme-mit-gtfs-daten-und-otp)
- [Getting started](#getting-started)
  - [Backend](#backend)
  - [Web-Frontend](#web-frontend)
- [Mögliche zukünftige Erweiterungen](#m%C3%B6gliche-zuk&uuml;nftige-erweiterungen)
   


# Ziele
- Es soll mit verschiedenen Instrumenten versucht werden, eine Isochronenenkarte mit den Anfahrtszeiten zu Flughäfen in der Schweiz zu erzeugen. 
- Dafür soll in einem ersten Schritt versucht werden, mit [QGis][qgis] und allenfalls geeigneten Plugins Isochronenkarten mit fixen Zeitintervallen für alle Flughäfen in der Schweiz zu erzeugen.
- In einem weiteren Schritt soll eine Webapplikation zur dynamischen Erzeugung von Isochronen unter Verwendung von Webservices erzeugt werden.

## Optionale Ziele
- Isochronen für eine beliebige Adresse und Zeitintervalle erstellen
- Konfiguration von Parameter via Web-GUI. Beispielsweise Transportmittel: Zu Fuss, Auto, öffentlicher Verkehr, etc.

# Vorgehen
Zu Beginn des Projektes wurden zwei Tools für die Umsetzung der Ziele verglichen. Das Plugin ORS Tools für die Desktop Software QGis und die Open Source Applikation OpenTripPlanner (OTP).

## QGis - ORS Tools Plugin
Die Aufgabe der Isochronenerstellung ist in QGis nicht nativ zu lösen, kann aber mit Plugins recht komfortabel umgesetzt werden. Wir haben das Plugin [ORS Tools Plugin][ors_tools] verwendet.
Eine gute Installationsanleitung ist unter folgendem Link verfügbar: [ORS Tools Help][ORS_Tools_Help].

### Aufbau
Anfangs haben wir als Basemap eine Karte von Openstreetmap verwendet, sind dann zum Schluss aber bei einer farblich etwas dezenteren Karte von CartoDB verblieben. Diese kann gleich wie die Openstreetmap über das Quickmapservices-Plugin als Layer zu QGis hinzugefügt werden.
Da wir keine Geodaten zu den Standorten der Flughäfen der Schweiz gefunden haben, haben wir diese händisch in zwei separaten Vektorlayern erfasst, als Grundlage dienten dazu die in Wikipedia erfasste Koordinatenpunkte der Flugplätze.

### Verwendete Datenquellen
ORS verwendet die API von [OpenRouteService.org][OpenRouteService], die einen entsprechenden Account auf der Plattform voraussetzt.
Nach hinterlegen des entsprechenden Access-Tokens kann das Plugin die Fahrzeiten zur Berechnung der Isochronen direkt von diesem Service beziehen.

### Verwendung des Plugins

![Screenshot ORS Tools UI](assets/pictures/ors_tools_ui.PNG)

Nach der Installation kann das Plugin über die Toolbar aufgerufen werden. Danach öffnet sich ein Dialog, der
diverse Verwendungsmodi des Plugins anbietet. Unter 'Batch Job' -> 'Isochrones' kann ein weiterer Dialog geöffnet werden, 
der die Erstellung eines Isochronenlayers aus einem gegebenen Inputlayer oder einem einzelnen Punkt auf der Karte erlaubt:


### Ergebnisse

![Screenshot ORS Tools](assets/pictures/ors_tools_qgis_plugin.png)

<details><summary>Kompletter Report (Landesflughäfen)</summary>
<p>
  
![Alt text](https://github.com/chrim5/isomap-switzerland/blob/master/qgis_project/reports/Isochrone_Map_Switzerland_International.svg?sanitize=true)
[PDF-Version][qgis_report_international_pdf]
</p>
</details>

<details><summary>Kompletter Report (Regionalflughäfen)</summary>
<p>
  
![Alt text](https://github.com/chrim5/isomap-switzerland/blob/master/qgis_project/reports/Isochrone_Map_Switzerland_Regio.svg?sanitize=true)
[PDF-Version][qgis_report_regional_pdf]
</p>
</details>
Es ist relativ einfach, mit dem ORS-Plugin in QGis Isochronenkarten zu erzeugen. Allerdings sind die Konfigurationsmöglichkeiten auch stark eingeschränkt, bis auf die Intervalle bis max. 60 Minuten und einige vorggegebenen Fortbewegungsmittel kann man kaum Einfluss auf das Ergebnis nehmen. Wir haben uns erstmal auf Isochronen mit dem Auto als Fortbeweungsmittel sowie unsere beiden verschiedenen Inputlayers der Standorte der Landes- resp. Regionalflughäfen konzentriert.
Aus diesen Resulaten ist auch leicht zu erkennen, dass die Ergebnisse des Plugins je nach Anwendungszweck nicht perfekt sind. Beispielsweise könnte bei sich überlappenden Bereichen gewünscht sein, dass diese automatisch miteinander zu einem Bereich verrechnet werden. Dazu ist das Plugin leider nicht in der Lage. Aus diesen Gründen haben wir uns entschieden, den QGis-Ansatz nicht mehr weiter zu verfolgen, sondern mit einem webbasierten Ansatz mit Leaflet und OpenTripPlanner weiterzuarbeiten.

## OTP - OpenTripPlanner
OpenTripPlanner (OTP) ist primär ein Open Source Projekt zur Reiseplanung. Mit Hilfe von GTFS- und OpenStreetMap-Daten können Fahrgastinformationen, Verkehrsnetze, etc. analysiert werden. Dadurch können Routen, die Transit-, Fussgänger-, Fahrrad- und Autosegmente über Netzwerke kombinieren und gefunden werden. Die Software läuft auf praktisch jeder Plattform mit einer JVM (Java Virtual Machine). Alle Anfragen werden über eine REST-API behandelt, beispielsweise um die Isochronen für einen bestimmten Punkt (Koordinate) berechnen zu lassen und das Resultat als geoJSON zurückgeben zu können (Beispiel: http://docs.opentripplanner.org/en/latest/Intermediate-Tutorial/).
Projektseite: http://opentripplanner.org

## Evaluierung
Da OTP mehr Funktionen und Parameter zur Erstellung von Isochronenkarten bietet, haben wir uns für dieses Tool entschieden um unsere Ziele zu erreichen. Wir verwenden OTP als Backend-Service und visualisieren die Isochronenkarten in einem Web-Frontend mit Hilfe der JavaScript-Bibliothek Leaflet.

### Webapplikation
## Aufbau
![Architektur](assets/pictures/architecture.png)  
Mit Leaflet wird die etwas hellere Basemap von [CartoDB] eingebunden, damit die Isochronen später besser dargestellt werden. Die Requests auf das OTP-Backend werden mit asynchronen Abfragen (jQuery/AJAX) durchgeführt:
```javascript
 $.ajax({
    url:
      "http://localhost:8080/otp/routers/current/isochrone?" + cutoffSecParam,
    type: "GET",
    dataType: "json",
    data: {
      fromPlace: from.join(","),
      mode: mode,
      maxWalkDistance: 1500
    },
    success: drawIsochrone,
    error: isochroneError
  });
}
```
Als Adresssuche für OpenStreetMap (OSM) wird die API von Photon angesprochen (http://photon.komoot.de/). Hierzu gibt es auch ein praktisches Plugin für Leaflet, welches die Einbindung in unser Projekt vereinfacht.
```javascript
var map = new L.Map("map", {
  scrollWheelZoom: false,
  zoomControl: false,
  photonControl: true,
  photonControlOptions: {
    onSelected: showSearchPoints,
    placeholder: "Search...",
    position: "topleft",
    url: 'https://photon.komoot.de/api/?',
    limit: 5
  },
```

### Ergebnisse
![Screenshot Web-Frontend](assets/pictures/webfrontend.png)

## Quellen
### Software
* ORS Tools (QGis Plugin): https://openrouteservice.org/
* OpenTripPlanner: http://docs.opentripplanner.org/en/latest/Intermediate-Tutorial/#calculating-travel-time-isochrones
* Leaflet: https://leafletjs.com/
* Leaflet Plugin Photon: https://github.com/komoot/leaflet.photon
### Daten und Schnittstellen
* General Transit Feed Specification Format (GTFS): https://opentransportdata.swiss/en/dataset/timetable-2019-gtfs
https://developers.google.com/transit/gtfs/
* Benutzerdefinierte PBF-Kartenausschnitte erzeugen: https://extract.bbbike.org/.
* Open Street Map: https://www.openstreetmap.org/#map=8/46.825/8.224
* Photon-API: http://photon.komoot.de/

## Mögliche Probleme mit GTFS-Daten und OTP
Um die Scheizer GTFS-Daten mit OTP verwenden zu können, mussten wir eine spezifische Anpassung im Code von OTP selber vornehmen und einen eigenen Build erstellen ([JAR-File](otp-1.4.0-SNAPSHOT-shaded.jar)). Der Grund dafür war, dass bei den GTFS-Daten ein Taxi-Service hinterlegt ist, der OTP nicht interpretieren kann und deshalb beim Erstellen des Graphen abbricht. Es gibt bereits einen Patch, der jedoch noch nicht in die neuste Major-Version von OTP aufgenommen wurde. Der Link für die nötigen Korrekturen: https://github.com/johannilsson/OpenTripPlanner/commit/4f776e79de832b67d1c27d9508588472979bf37c

Zudem kann es vorkommen, dass OTP einige Routen-Typen in den GTFS-Daten nicht richtig interpretieren kann. Für die jeweiligen Typen gibt es Codes, die OTP unter Umständen auch nicht richtig interpretiert und Probleme verursacht. Hier ein Beispiel in der Google-Gruppe von OTP: https://groups.google.com/forum/#!topic/opentripplanner-dev/ZPbmb-a21Qg
Als Umgehungslösung kann in einigen Fällen der Code im routes.txt der GTFS-Daten (normalerweise eine ZIP-Datei) angepasst werden.

# Getting started
## Backend
Wir verwenden als Backendservice zum Berechnen der Isochronen einen lokalen [OpenTripPlanner-Service][opentripplanner]. Dieser verwendet ein Graph-Objekt eines beliebigen Kartenauschnittes, um Fahrzeiten zwischen verschiedenen Punkten auf der Karte zu berechnen.
Um den Graphen zu erstellen sind verschiedene Daten erforderlich:
- Geodaten der Schweiz, hierzu wurde ein etwas über die Landesgrenzen hinausgehender Ausschnitt verwendet, welcher von [hier][switzerland_extended_pbf] heruntergeladen werden kann.
- GTFS-Fahrplandaten, die ebenfalls in den Graphen kompiliert werden. Diese liegen als .zip-File vor, welches [hier][switzerland_gtfs] abgeholte werden kann.
```
mkdir "./graphs/current"
```

Die erwähnten Daten müssen im 'graphs/current' - Ordner des Projektes abgelegt werden, damit sie mit folgendem Befehl gefunden und in den Graphen hineinkompiliert werden können. Dieser Schritt ist recht Zeit- und Speicherintensiv, muss aber nur einmal gemacht werden.
```
java -Xmx10G -jar otp-1.4.0-SNAPSHOT-shaded.jar --build ./graphs/current
```

Web-Service mit kompiliertem Graph starten:
```
java -Xmx8G -jar otp-1.4.0-SNAPSHOT-shaded.jar --graphs ./graphs --router current --server

20:56:21.233 INFO (OTPServer.java:39) Wiring up and configuring server.
20:56:21.237 INFO (GraphScanner.java:64) Attempting to automatically register routerIds [current]
20:56:21.237 INFO (GraphScanner.java:65) Graph files will be sought in paths relative to .
20:56:21.238 INFO (GraphService.java:176) Registering new router 'current'
20:56:21.239 INFO (InputStreamGraphSource.java:181) Loading graph...
20:56:24.661 INFO (Graph.java:746) Graph version: MavenVersion(1, 4, 0, SNAPSHOT, 35797650dfd0aa43d225b579b7db4ea748de769b)
20:56:24.662 INFO (Graph.java:747) OTP version:   MavenVersion(1, 4, 0, SNAPSHOT, 35797650dfd0aa43d225b579b7db4ea748de769b)
20:56:24.662 INFO (Graph.java:764) This graph was built with the currently running version and commit of OTP.

....
20:58:03.479 INFO (NetworkListener.java:750) Started listener bound to [0.0.0.0:8080]
20:58:03.481 INFO (NetworkListener.java:750) Started listener bound to [0.0.0.0:8081]
20:58:03.484 INFO (HttpServer.java:300) [HttpServer] Started.
20:58:03.484 INFO (GrizzlyServer.java:153) Grizzly server running.
```
Der Web-Server kann dann unter http://localhost:8080/, resp. https://localhost:8081 aufgerufen werden.

## Web-Frontend
Als Einstiegspunkt kann die lokale HTML-Datei [index.html](js_client/index.html) aufgerufen werden.
In der Datei [script.js](js_client/script.js) können die Parameter für die Isochronenberechnungen angepasst werden:
```javascript
// Which isochrones to calculate? (in seconds)
var cutoffSec = [900, 1800, 2700, 3600, 4500, 5400];
// Transport mode
var mode = 'WALK, TRANSIT';
```
Eine Übersicht über die möglichen Parameter und Optionen ist in der API-Dokumentation von OTP zu finden: http://dev.opentripplanner.org/apidoc/1.3.0/resource_LIsochrone.html

# Mögliche zukünftige Erweiterungen
Der Leaflet Ansatz bietet jede Menge Raum für zukünftige Erweiterungen. Beispielsweise könnten die momentan noch fix vorgegebenen Isochronen-Intervalle und zugehörigen Styles über das GUI verwaltet werden, so dass sich der Benutzer sein Resultatset selber genauer zusammenstellen kann. Weiter könnte die App relativ einfach mit mehr verschiedenen Fortbewegungsarten erweitert werden, momentan werden erst 'öffentlicher Verkehr' oder 'zu Fuss' direkt im GUI unterstützt. Mit dem OTP-Backend wäre es auch denkbar, statt nur Isochronen darzustellen, wahlweise auch Fortbewegungsdistanzen als Isolinien anzeigen zu können.


[qgis]: https://www.qgis.org/de/site/
[qgis_report_international_pdf]: qgis_project/reports/Isochrone_Map_Switzerland_International.pdf
[qgis_report_regional_pdf]: qgis_project/reports/Isochrone_Map_Switzerland_Regio.pdf
[ors_tools]: https://plugins.qgis.org/plugins/ORStools/
[switzerland_extended_pbf]: https://drive.google.com/file/d/11sF108eoYH1Y90dz2mh05JzF1vsw5rkr/view?usp=sharing
[switzerland_gtfs]:https://drive.google.com/file/d/1FaKUMMOI0vpWk9JVY4480sLfDZQXBHQa/view?usp=sharing
[opentripplanner]:https://www.opentripplanner.org/
[OpenRouteService]:https://openrouteservice.org/
[ORS_Tools_Help]:https://github.com/nilsnolde/orstools-qgis-plugin/wiki/ORS-Tools-Help
[CartoDB]:https://carto.com/location-data-services/basemaps/

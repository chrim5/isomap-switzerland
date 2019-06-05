### IsoMap - Isochronenkarte der Schweizer Flughäfen

#### Semesterarbeit im Wahlfach Geoinformationssysteme an der BFH
-----------------------------------------------------------------


##### Marc Christen, Simon Schmid

- [Ziele](#ziele)
  - [Optionale Ziele](#optionale-ziele)
- [Vorgehen](#vorgehen)
  - [QGis - ORS Tools Plugin](#qgis---ors-tools-plugin)
    - [Aufbau](#aufbau)
    - [Verwendete Datenquellen](#verwendete-datenquellen)
    - [Ergebnisse](#ergebnisse)
  - [OTP - OpenTripPlanner](#otp---opentripplanner)
  - [Evaluierung](#evaluierung)
    - [Webapplikation](#webapplikation)
  - [Aufbau](#aufbau-1)
  - [Verwendete Datenquellen](#verwendete-datenquellen-1)
  - [Ergebnisse](#ergebnisse-1)
- [Getting started](#getting-started)


# Ziele
- Es sollen mit verschiedenen Instrumenten versucht werden, eine Isochronenenkarte mit den Anfahrtszeiten zu Flughäfen in der Schweiz zu erzeugen. 
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
Damit können die Isochronen-Daten direkt von diesem Service bezogen werden.

### Ergebnisse

-> ORS Bild einfügen

## OTP - OpenTripPlanner
OpenTripPlanner (OTP) ist primär ein Open Source Projekt zur Reiseplanung. Mit Hilfe von GTFS- und OpenStreetMap-Daten können Fahrgastinformationen, Verkehrsnetze, etc. analysiert werden. Dadurch können Routen, die Transit-, Fußgänger-, Fahrrad- und Autosegmente über Netzwerke kombinieren gefunden werden. Alle Anfragen können über eine REST-API gemacht werden. Projektseite: http://opentripplanner.org


## Evaluierung


### Webapplikation

## Aufbau

## Verwendete Datenquellen

## Ergebnisse


# Getting started


Wir verwenden als Backendservice zum berechnen der Isochronen einen lokalen [Opentripplanner-Service][opentripplanner]. Dieser verwendet ein Graph-Objekt eines beliebigen Kartenauschnittes um Fahrzeiten zwischen verschiedenen Punkten auf der Karte zu berechnen. Die folgenden Punkte müssen

Um den Graphen zu erstellen sind verschiedene Daten erforderlich:
- Geodaten der Schweiz, hierzu wurde ein etwas über die Landesgrenzen hinausgehender Ausschnitt verwendet, welcher von [hier][switzerland_extended_pbf] heruntergeladen werden kann.
- Fahrplandaten, die ebenfalls in den Graphen kompiliert werden. Diese liegen als .zip-File vor, welches [hier][switzerland_gtfs] abgeholte werden kann.
```
mkdir "./graphs/current"
```

Die erwähnten Daten müssen im 'graphs/current' - Ordner des Projektes abgelegt werden, damit sie mit folgendem Befehl gefunden und in den Graphen hineinkompiliert werden können. Dieser Schritt ist sehr Zeit- und Speicherintensiv, muss aber nur einmal gemacht werden.
```
java -Xmx10G -jar otp-1.4.0-SNAPSHOT-shaded.jar --build ./graphs/current
```

Webservice mit kompiliertem Graph starten:
```
java -Xmx8G -jar otp-1.4.0-SNAPSHOT-shaded.jar --graphs ./graphs --router current --server
```

[qgis]: https://www.qgis.org/de/site/
[ors_tools]: https://plugins.qgis.org/plugins/ORStools/
[switzerland_extended_pbf]: https://drive.google.com/file/d/11sF108eoYH1Y90dz2mh05JzF1vsw5rkr/view?usp=sharing
[switzerland_gtfs]:https://drive.google.com/file/d/1FaKUMMOI0vpWk9JVY4480sLfDZQXBHQa/view?usp=sharing
[opentripplanner]:https://www.opentripplanner.org/
[OpenRouteService]:https://openrouteservice.org/
[ORS_Tools_Help]:https://github.com/nilsnolde/orstools-qgis-plugin/wiki/ORS-Tools-Help
### isomap-switzerland

#### Semesterarbeit im Wahlfach Geoinformationssysteme an der BFH
-----------------------------------------------------------------


##### Marc Christen, Simon Schmid


# Ziele
- Es sollen mit verschiedenen Instrumenten versucht werden, eine Isochronenenkarte mit den Anfahrtszeiten zu Flughäfen in der Schweiz zu erzeugen. 
- Dafür soll in einem ersten Schritt versucht werden, mit [QGis][qgis] und allenfalls geeigneten Plugins Isochronenkarten mit fixen Zeitintervallen für alle Flughäfen in der Schweiz zu erzeugen.
- In einem weiteren Schritt soll eine Webapplikation zur dynamischen Erzeugung von Isochronen unter Verwendung von Webservices erzeugt werden.

## Optionale Ziele
- Isochronen für eine beliebige Adresse und Zeitintervalle erstellen



# QGis Projekt
Die Aufgabe der Isochronenerstellung ist in QGis nicht nativ zu lösen, kann aber mit Plugins recht komfortabel umgesetzt werden. Wir haben das Plugin [ORS Tools Plugin][ors_tools] verwendet. 

## Aufbau
Anfangs haben wir als Basemap eine Karte von Openstreetmap verwendet, sind dann zum Schluss aber bei einer farblich etwas dezenteren Karte von CartoDB verblieben. Diese kann gleich wie die Openstreetmap über das Quickmapservices-Plugin als Layer zu QGis hinzugefügt werden.
Da wir keine Geodaten zu den Standorten der Flughäfen der Schweiz gefunden haben, haben wir diese händisch in zwei separaten Vektorlayern erfasst, als Grundlage dienten dazu die in Wikipedia erfasste Koordinatenpunkte der Flugplätze. 

## Verwendete Datenquellen

## Ergebnisse


# Webapplikation

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
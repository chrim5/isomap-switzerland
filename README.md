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


[qgis]: https://www.qgis.org/de/site/
[ors_tools]: https://plugins.qgis.org/plugins/ORStools/

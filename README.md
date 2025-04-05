# Milledoni

## Over de opdracht

Milledoni heeft een nieuw design en ik heb dat toegepast met de aangeboden principen en standaarden vanuit school. De website van Milledoni heeft als doel mensen helpen bij het kiezen van een cadeau.
Bij de niuwe site willen ze hier gebruik van maken met een (AI) chatbot. Zodat die je kan hellpen het perfecte cadeau('s) te tonen.

## Doel

Feedback verwerken van vorige sprint review en verder het design uitwerken zodat ik aan het einde van deze sprint er weer feedback op kan krijgen. Zodat ik zo ver mogelijk kan komen met de website realiseren.


## Beschrijnving
Vanuit school hebben we deze sprint vooral met UI-States, Progressive Enhancement & het POSTen en PATCHen/DELETEen van data uit de database gewerkt. 
Ik heb een aantal UI-states verwerkt in het design. 
En er ervoor gezorgt dat je cadeau's kan toevoegen doormiddelvan een POST en de data weerk uit de database kan verwijderne.

# Uitwerking

## Mobile Desing / User  Story

In dit filmpje laat ik zien hoe je cadeau's toevoegt. Hierin laat ik al bijna alle functionaliteit zien.
Je kan POSTen naar de server en dan zie je de client-site loading state totdat het laden klaar is.
Als het process klaar is zie je dat de button verandert naar een ingevulde bookmark en dat de bookmark button in de navigatie bovenin een navigatie meekrijgt.
Het cadeau is aan de lijst toegevoegt en kan daar bekeken worden. Je kan daarna het cadeau ook verwijderen en dan kan je zien dat die er niet meer staat.
Je ziet hier ook de ideal state waarin je een lijst getoont wordt waarin je alle producten kan terugvinden die je toegevoegt hebt.

https://github.com/user-attachments/assets/6a6b7b96-d794-4ebb-bad8-d5ad994f4e53

Empty State:

<img src="https://github.com/user-attachments/assets/55574a21-9846-48b0-823c-e3e54b90efef" width=300/>

Bij een foute link:

![image](https://github.com/user-attachments/assets/f412b74c-1c83-4b8c-a212-9a8e35054e99)

![image](https://github.com/user-attachments/assets/e6f600f6-554c-4d4d-b8d3-50d9e354641c)


## Code Voorbeelden

### Posten

https://github.com/Sebastiaan-hva/the-web-is-for-everyone-interactive-functionality/blob/6653c2ffd5a9101727bfc693f3e7a869fd2564ed/server.js#L75-L111
<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual of video toe 📸 -->
<!-- Voeg een link toe naar GitHub Pages 🌐-->

### UI States

https://github.com/Sebastiaan-hva/the-web-is-for-everyone-interactive-functionality/blob/6653c2ffd5a9101727bfc693f3e7a869fd2564ed/views/savedgifts.liquid#L19-L31

https://github.com/Sebastiaan-hva/the-web-is-for-everyone-interactive-functionality/blob/6653c2ffd5a9101727bfc693f3e7a869fd2564ed/views/index.liquid#L58-L117

## Installatie

-**Fork/Download** deze Repository.

-Download **NodeJS**

-Installeer NodeJS in de console van de repo in je editor of in de command line van je folder met **NPM Install** (NPM I)

-De laatste stap is de server lokaal starten met **NPM Start**

This project is licensed under the terms of the [MIT license](./LICENSE).

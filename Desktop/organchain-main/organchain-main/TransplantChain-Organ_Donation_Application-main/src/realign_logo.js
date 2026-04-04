const fs = require('fs');
const path = require('path');

const basePath = __dirname;
const files = fs.readdirSync(basePath).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(path.join(basePath, file), 'utf8');

    // Break the logo completely out of the interior font wrapper and rely entirely on the outer HTML Anchor <a flex gap-2> for horizontal flow!
    // Adding class h-12 sizes it up precisely into the 48px threshold per user instructions
    const regex = /<span class="([^"]*)"><img src="images\/primary-logo\.png" alt="Logo" class="[^"]*" \/>\s*(<span[^>]*>.*?<\/span>)<\/span>/g;
    
    if (content.match(regex)) {
        content = content.replace(regex, (match, spanClasses, innerText) => {
            return `<img src="images/primary-logo.png" alt="Logo" class="h-12 w-auto object-contain drop-shadow-md" />
                    <span class="${spanClasses} ml-2 whitespace-nowrap flex items-center">${innerText}</span>`;
        });
        
        fs.writeFileSync(path.join(basePath, file), content);
        console.log(`Realigned structural layout natively in ${file}`);
    }
});
console.log('Flex alignment overhaul complete.');

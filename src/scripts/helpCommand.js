
/**
 * Script d'aide qui affiche toutes les commandes disponibles lorsque l'utilisateur saisit "help"
 */

const chalk = require('chalk');

const showHelp = () => {
  console.log(chalk.bold.blue('\n===== JenCity - Guide des Commandes =====\n'));
  
  console.log(chalk.yellow('Commandes de Base:'));
  console.log(chalk.green('help') + ' - Affiche cette liste de commandes');
  console.log(chalk.green('npm run dev') + ' - Démarre l\'application en mode développement');
  console.log(chalk.green('npm run build') + ' - Compile l\'application pour la production');
  console.log(chalk.green('npm run preview') + ' - Prévisualise l\'application compilée localement');
  
  console.log(chalk.yellow('\nAPI et Documentation:'));
  console.log(chalk.green('npm run start:api') + ' - Démarre le serveur API');
  console.log(chalk.green('npm run docs:generate') + ' - Génère la documentation de l\'API');
  console.log(chalk.green('npm run docs:view') + ' - Ouvre la documentation dans le navigateur');
  
  console.log(chalk.yellow('\nBase de Données:'));
  console.log(chalk.green('npm run db:create') + ' - Crée les tables de la base de données');
  console.log(chalk.green('npm run db:seed') + ' - Remplit la base de données avec des données de test');
  console.log(chalk.green('npm run db:reset') + ' - Réinitialise la base de données (supprime et recrée)');
  
  console.log(chalk.yellow('\nTraduction et Internationalisation:'));
  console.log(chalk.green('npm run i18n:extract') + ' - Extrait les chaînes de traduction du code');
  console.log(chalk.green('npm run i18n:compile') + ' - Compile les fichiers de traduction');
  
  console.log(chalk.yellow('\nDéploiement:'));
  console.log(chalk.green('npm run deploy') + ' - Déploie l\'application sur l\'environnement de production');
  console.log(chalk.green('npm run deploy:staging') + ' - Déploie l\'application sur l\'environnement de staging');
  
  console.log(chalk.bold.blue('\n========================================\n'));
  
  console.log(chalk.italic('Pour plus d\'informations, consultez la documentation complète dans le dossier "docs" ou visitez https://jencity-docs.example.com'));
};

// Vérifie si le script est exécuté directement avec "node helpCommand.js"
if (require.main === module) {
  showHelp();
}

module.exports = { showHelp };

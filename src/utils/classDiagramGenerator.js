
/**
 * Utility to generate a visual class diagram based on entity definitions
 */

/**
 * Generates HTML for class diagram based on entity configurations
 * @param {Array} entities Array of entity configurations
 * @returns {string} HTML content for class diagram visualization
 */
function generateClassDiagram(entities) {
  // Generate HTML content for class diagram
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JenCity API - Diagramme de Classes</title>
  <style>
    :root {
      --primary-color: #2c3e50;
      --secondary-color: #3498db;
      --accent-color: #e74c3c;
      --light-color: #ecf0f1;
      --dark-color: #2c3e50;
      --success-color: #2ecc71;
      --warning-color: #f39c12;
      --border-radius: 6px;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: var(--dark-color);
      background-color: var(--light-color);
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      background-color: white;
      border-radius: var(--border-radius);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    h1, h2, h3 {
      color: var(--primary-color);
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
      padding-bottom: 10px;
      border-bottom: 2px solid var(--secondary-color);
    }
    .navbar {
      background-color: var(--primary-color);
      padding: 10px 20px;
      margin-bottom: 20px;
      border-radius: var(--border-radius);
    }
    .navbar a {
      color: white;
      text-decoration: none;
      margin-right: 20px;
      font-weight: bold;
    }
    .navbar a:hover {
      text-decoration: underline;
    }
    .class-diagram {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      justify-content: center;
    }
    .entity-box {
      border: 2px solid var(--secondary-color);
      border-radius: var(--border-radius);
      width: 300px;
      overflow: hidden;
      margin-bottom: 20px;
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .entity-header {
      background-color: var(--secondary-color);
      color: white;
      padding: 10px;
      text-align: center;
      font-weight: bold;
      font-size: 1.2em;
    }
    .entity-content {
      padding: 15px;
    }
    .field {
      padding: 5px 0;
      border-bottom: 1px solid #eee;
    }
    .field:last-child {
      border-bottom: none;
    }
    .field-name {
      font-weight: bold;
    }
    .field-type {
      color: var(--accent-color);
      font-style: italic;
      margin-left: 10px;
    }
    .relation-section {
      margin-top: 10px;
      padding-top: 10px;
      border-top: 1px dashed #ccc;
    }
    .relation {
      display: flex;
      align-items: center;
      padding: 5px 0;
    }
    .relation-type {
      background-color: var(--primary-color);
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 0.8em;
      margin-right: 8px;
    }
    .primary-key {
      font-weight: bold;
      color: var(--success-color);
    }
    .foreign-key {
      color: var(--warning-color);
    }
    .required-field:after {
      content: '*';
      color: var(--accent-color);
      margin-left: 3px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #777;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="navbar">
      <a href="api-documentation.html">Documentation API</a>
      <a href="diagram_de_class.html">Diagramme de Classes</a>
    </div>
    
    <h1>Diagramme de Classes - JenCity API</h1>
    
    <div class="class-diagram">
      ${entities.map(entity => `
        <div class="entity-box">
          <div class="entity-header">${entity.name}</div>
          <div class="entity-content">
            <h3>Attributs</h3>
            ${entity.fields.map(field => `
              <div class="field ${field.isPrimary ? 'primary-key' : ''} ${field.isOptional ? '' : 'required-field'}">
                <span class="field-name">${field.name}</span>
                <span class="field-type">${field.type}</span>
                ${field.isPrimary ? ' (PK)' : ''}
                ${field.reference ? ` -> ${field.reference} (FK)` : ''}
              </div>
            `).join('')}
            
            ${entity.relations && entity.relations.length > 0 ? `
              <div class="relation-section">
                <h3>Relations</h3>
                ${entity.relations.map(relation => `
                  <div class="relation">
                    <span class="relation-type">${relation.type}</span>
                    <span>${relation.entity}</span>
                    <span class="field-type">via ${relation.via}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
    
    <div class="footer">
      <p>JenCity API - Système de Documentation Automatique</p>
      <p>Généré le ${new Date().toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>
  </div>
</body>
</html>
  `;
  
  return html;
}

module.exports = { generateClassDiagram };

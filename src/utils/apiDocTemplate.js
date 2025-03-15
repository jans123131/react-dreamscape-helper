
/**
 * Utility to generate HTML documentation template for the API
 */

/**
 * Generates HTML for API documentation based on route configurations
 * @param {Array} routes Array of route configurations
 * @param {Array} entities Array of entity configurations
 * @returns {string} HTML content for API documentation
 */
function generateDocTemplate(routes, entities) {
  // Group routes by resource (first part of the path)
  const resourceGroups = routes.reduce((groups, route) => {
    const pathParts = route.path.split('/').filter(part => part);
    const resource = pathParts[0];
    if (!groups[resource]) {
      groups[resource] = [];
    }
    groups[resource].push(route);
    return groups;
  }, {});

  // Generate HTML content for API documentation
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>JenCity API Documentation</title>
  <style>
    :root {
      --primary-color: #2c3e50;
      --secondary-color: #3498db;
      --accent-color: #e74c3c;
      --light-color: #ecf0f1;
      --dark-color: #2c3e50;
      --success-color: #2ecc71;
      --warning-color: #f39c12;
      --error-color: #e74c3c;
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
    .resource-group {
      margin-bottom: 40px;
      border: 1px solid #ddd;
      border-radius: var(--border-radius);
      overflow: hidden;
    }
    .resource-header {
      background-color: var(--secondary-color);
      color: white;
      padding: 10px 20px;
      font-size: 1.2em;
      font-weight: bold;
      text-transform: capitalize;
    }
    .endpoint {
      padding: 20px;
      border-bottom: 1px solid #ddd;
    }
    .endpoint:last-child {
      border-bottom: none;
    }
    .endpoint-header {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    .method {
      padding: 5px 10px;
      border-radius: 4px;
      font-weight: bold;
      color: white;
      margin-right: 15px;
      min-width: 60px;
      text-align: center;
    }
    .method.get {
      background-color: var(--success-color);
    }
    .method.post {
      background-color: var(--secondary-color);
    }
    .method.put, .method.patch {
      background-color: var(--warning-color);
    }
    .method.delete {
      background-color: var(--error-color);
    }
    .path {
      font-family: monospace;
      font-size: 1.1em;
      font-weight: bold;
    }
    .description {
      margin-bottom: 15px;
    }
    .params, .request-body, .response {
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    th {
      background-color: #f5f5f5;
      font-weight: bold;
    }
    .json {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      font-family: monospace;
      white-space: pre-wrap;
      border: 1px solid #ddd;
    }
    .test-interface {
      margin-top: 20px;
      padding: 15px;
      background-color: #f9f9f9;
      border-radius: var(--border-radius);
      border: 1px dashed #ccc;
    }
    button {
      background-color: var(--secondary-color);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    button:hover {
      background-color: #2980b9;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      color: #777;
    }
    .schema-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="navbar">
      <a href="api-documentation.html">Documentation API</a>
      <a href="diagram_de_class.html">Diagramme de Classes</a>
    </div>
    
    <h1>JenCity API Documentation</h1>

    <h2>Schéma de la Base de Données</h2>
    <p>Cette API interagit avec une base de données contenant les entités suivantes. Pour une représentation visuelle, consultez le <a href="diagram_de_class.html">diagramme de classes</a>.</p>
    
    ${entities.map(entity => `
      <h3>${entity.name}</h3>
      <table class="schema-table">
        <thead>
          <tr>
            <th>Attribut</th>
            <th>Type</th>
            <th>Propriétés</th>
          </tr>
        </thead>
        <tbody>
          ${entity.fields.map(field => `
            <tr>
              <td>${field.name}</td>
              <td>${field.type}</td>
              <td>${field.attributes && Array.isArray(field.attributes) ? field.attributes.join(', ') : 
                  `${field.isPrimary ? 'Clé primaire' : ''}
                   ${field.isPrivate ? 'Privé' : ''}
                   ${field.isOptional ? 'Optionnel' : 'Requis'}
                   ${field.reference ? `Référence: ${field.reference}` : ''}`}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `).join('')}

    <h2>Points d'Accès API</h2>
    ${Object.entries(resourceGroups).map(([resource, routes]) => `
      <div class="resource-group">
        <div class="resource-header">${resource}</div>
        ${routes.map(route => `
          <div class="endpoint">
            <div class="endpoint-header">
              <div class="method ${route.method.toLowerCase()}">${route.method.toUpperCase()}</div>
              <div class="path">/api${route.path}</div>
            </div>
            <div class="description">${route.description}</div>
            
            ${route.params ? `
              <div class="params">
                <h3>Paramètres</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Type</th>
                      <th>Requis</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${route.params.map(param => `
                      <tr>
                        <td>${param.name}</td>
                        <td>${param.type}</td>
                        <td>${param.required ? 'Oui' : 'Non'}</td>
                        <td>${param.description}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : ''}
            
            ${route.requestBody ? `
              <div class="request-body">
                <h3>Corps de la Requête</h3>
                <div class="json">${JSON.stringify(route.requestBody, null, 2)}</div>
              </div>
            ` : ''}
            
            <div class="response">
              <h3>Réponse</h3>
              <p>Status: ${route.response.status}</p>
              <div class="json">${JSON.stringify(route.response, null, 2)}</div>
            </div>
            
            <div class="test-interface">
              <h3>Tester cet endpoint</h3>
              <button onclick="alert('Fonctionnalité de test à venir')">Envoyer la Requête</button>
              <button onclick="alert('Copié dans le presse-papiers')">Copier cURL</button>
              <button onclick="alert('Ouverture dans Postman')">Ouvrir dans Postman</button>
            </div>
          </div>
        `).join('')}
      </div>
    `).join('')}
    
    <div class="footer">
      <p>JenCity API Documentation - Version 1.0</p>
      <p>Généré le ${new Date().toLocaleDateString('fr-FR', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}</p>
    </div>
  </div>

  <script>
    // Add JavaScript for interactive features like test requests
    // This is a placeholder for future implementation
  </script>
</body>
</html>
  `;
  
  return html;
}

module.exports = { generateDocTemplate };

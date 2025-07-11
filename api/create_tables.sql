-- Create emails table for contact us functionality
CREATE TABLE IF NOT EXISTS `emails` (
  `id_message` int(11) NOT NULL AUTO_INCREMENT,
  `nom_client` varchar(255) NOT NULL,
  `email_client` varchar(255) NOT NULL,
  `telephone_client` varchar(20) DEFAULT NULL,
  `message_client` text NOT NULL,
  `vue_par_admin` tinyint(1) DEFAULT 0,
  `date_vue_admin` timestamp NULL DEFAULT NULL,
  `date_creation` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_message`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Keep messages table for agent-to-agent communication
-- The existing messages table structure remains for agent messaging
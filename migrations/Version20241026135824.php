<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241026135824 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE branch_product DROP CONSTRAINT fk_c8bec0a311f59c00');
        $this->addSql('DROP INDEX idx_c8bec0a311f59c00');
        $this->addSql('ALTER TABLE branch_product RENAME COLUMN branch_id_id TO branch_id');
        $this->addSql('ALTER TABLE branch_product ADD CONSTRAINT FK_C8BEC0A3DCD6CC49 FOREIGN KEY (branch_id) REFERENCES branch (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_C8BEC0A3DCD6CC49 ON branch_product (branch_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE branch_product DROP CONSTRAINT FK_C8BEC0A3DCD6CC49');
        $this->addSql('DROP INDEX IDX_C8BEC0A3DCD6CC49');
        $this->addSql('ALTER TABLE branch_product RENAME COLUMN branch_id TO branch_id_id');
        $this->addSql('ALTER TABLE branch_product ADD CONSTRAINT fk_c8bec0a311f59c00 FOREIGN KEY (branch_id_id) REFERENCES branch (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_c8bec0a311f59c00 ON branch_product (branch_id_id)');
    }
}

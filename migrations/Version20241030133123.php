<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241030133123 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE branch_product DROP CONSTRAINT fk_c8bec0a3de18e50b');
        $this->addSql('DROP INDEX idx_c8bec0a3de18e50b');
        $this->addSql('ALTER TABLE branch_product RENAME COLUMN product_id_id TO product_id');
        $this->addSql('ALTER TABLE branch_product ADD CONSTRAINT FK_C8BEC0A34584665A FOREIGN KEY (product_id) REFERENCES product (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_C8BEC0A34584665A ON branch_product (product_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE branch_product DROP CONSTRAINT FK_C8BEC0A34584665A');
        $this->addSql('DROP INDEX IDX_C8BEC0A34584665A');
        $this->addSql('ALTER TABLE branch_product RENAME COLUMN product_id TO product_id_id');
        $this->addSql('ALTER TABLE branch_product ADD CONSTRAINT fk_c8bec0a3de18e50b FOREIGN KEY (product_id_id) REFERENCES product (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_c8bec0a3de18e50b ON branch_product (product_id_id)');
    }
}

<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241020154742 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE branch_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE branch_product_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE company_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE branch (id INT NOT NULL, company_id_id INT DEFAULT NULL, name VARCHAR(50) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BB861B1F38B53C32 ON branch (company_id_id)');
        $this->addSql('CREATE TABLE branch_product (id INT NOT NULL, branch_id_id INT DEFAULT NULL, product_id_id INT DEFAULT NULL, stock_quantity INT DEFAULT NULL, price NUMERIC(10, 2) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_C8BEC0A311F59C00 ON branch_product (branch_id_id)');
        $this->addSql('CREATE INDEX IDX_C8BEC0A3DE18E50B ON branch_product (product_id_id)');
        $this->addSql('CREATE TABLE company (id INT NOT NULL, name VARCHAR(50) DEFAULT NULL, branch_count INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE branch ADD CONSTRAINT FK_BB861B1F38B53C32 FOREIGN KEY (company_id_id) REFERENCES company (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE branch_product ADD CONSTRAINT FK_C8BEC0A311F59C00 FOREIGN KEY (branch_id_id) REFERENCES branch (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE branch_product ADD CONSTRAINT FK_C8BEC0A3DE18E50B FOREIGN KEY (product_id_id) REFERENCES product (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product DROP price');
        $this->addSql('ALTER TABLE product DROP stock_quantity');
        $this->addSql('ALTER TABLE "user" ADD branch_id_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE "user" ADD CONSTRAINT FK_8D93D64911F59C00 FOREIGN KEY (branch_id_id) REFERENCES branch (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_8D93D64911F59C00 ON "user" (branch_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE "user" DROP CONSTRAINT FK_8D93D64911F59C00');
        $this->addSql('DROP SEQUENCE branch_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE branch_product_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE company_id_seq CASCADE');
        $this->addSql('ALTER TABLE branch DROP CONSTRAINT FK_BB861B1F38B53C32');
        $this->addSql('ALTER TABLE branch_product DROP CONSTRAINT FK_C8BEC0A311F59C00');
        $this->addSql('ALTER TABLE branch_product DROP CONSTRAINT FK_C8BEC0A3DE18E50B');
        $this->addSql('DROP TABLE branch');
        $this->addSql('DROP TABLE branch_product');
        $this->addSql('DROP TABLE company');
        $this->addSql('DROP INDEX IDX_8D93D64911F59C00');
        $this->addSql('ALTER TABLE "user" DROP branch_id_id');
        $this->addSql('ALTER TABLE product ADD price NUMERIC(10, 2) NOT NULL');
        $this->addSql('ALTER TABLE product ADD stock_quantity INT NOT NULL');
    }
}

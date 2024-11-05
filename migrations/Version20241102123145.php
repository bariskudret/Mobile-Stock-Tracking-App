<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20241102123145 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE order_history_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE order_history (id INT NOT NULL, branch_id INT NOT NULL, total_price DOUBLE PRECISION NOT NULL, date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D1C0D900DCD6CC49 ON order_history (branch_id)');
        $this->addSql('ALTER TABLE order_history ADD CONSTRAINT FK_D1C0D900DCD6CC49 FOREIGN KEY (branch_id) REFERENCES branch (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE product ADD order_history_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE product ADD CONSTRAINT FK_D34A04ADADDF7907 FOREIGN KEY (order_history_id) REFERENCES order_history (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_D34A04ADADDF7907 ON product (order_history_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE product DROP CONSTRAINT FK_D34A04ADADDF7907');
        $this->addSql('DROP SEQUENCE order_history_id_seq CASCADE');
        $this->addSql('ALTER TABLE order_history DROP CONSTRAINT FK_D1C0D900DCD6CC49');
        $this->addSql('DROP TABLE order_history');
        $this->addSql('DROP INDEX IDX_D34A04ADADDF7907');
        $this->addSql('ALTER TABLE product DROP order_history_id');
    }
}

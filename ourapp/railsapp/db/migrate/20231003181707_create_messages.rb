class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.text :content
      t.references :chat, null: false, foreign_key: true
      t.references :test_user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

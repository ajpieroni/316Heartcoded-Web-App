class AddEmailToTestUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :test_users, :email, :string
  end
end

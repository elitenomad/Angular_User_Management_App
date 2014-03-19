class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.integer :age
      t.string :job

      t.timestamps
    end
  end
end

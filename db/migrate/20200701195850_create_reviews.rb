class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :name
      t.string :brewery
      t.string :style
      t.string :description
      t.integer :appearance
      t.integer :aroma
      t.integer :flavor
      t.integer :mouthfeel
      t.integer :overall
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

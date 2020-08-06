class CategoriesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show]
  
  def index
  end


  ## 追加
  def show
    @category = Category.find(params[:id])
    @items = Item.search_by_categories(@category.subtree_ids).order("created_at DESC").page(params[:page]).per(4)
  end

end

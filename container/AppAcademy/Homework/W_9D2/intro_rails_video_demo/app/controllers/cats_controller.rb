class CatsController < ApplicationController
  # before_action do
  #   return if session[:notice].nil?
  #   msg, flag = session[:notice]
  #   session[:notice] = [msg, false]
  # end
  #
  # after_action do
  #   return if session[:notice].nil?
  #   msg, flag = session[:notice]
  #   return if flag
  #   session[:notice] = nil
  # end

  def index
    # GET /cats
    if params[:tag]
      @cats = Tag.find_by(name: params[:tag]).cats
    else
      @cats = Cat.all
    end
    render :index
  end

  def show
    # GET /cats/123
    @cat = Cat.find(params[:id])
    render :show
  end

  # 1. GET Request for blank /cats/new form
  # 2. POST to /cats
  # 3. Validation fails
  # 4. Server render new template again.
  # 5. The form is filled in with @cat data

  def create
    # POST /cats
    # Content-Length: ...
    #
    # { "cat": { "name": "Sally" } }

    @cat = Cat.new(cat_params)

    if @cat.save
      # cat_url(@cat) == /cats/...
      flash[:notice] = "Created #{@cat.name}"
      redirect_to cat_url(@cat)
    else
      # redirect_to new_cat_url
      render :new

      # render json: @cat.errors.full_messages, status: :unprocessable_entity
    end
  end

  # 1. GET /cats/new to fetch a form
  # 2. User fills out form, clicks submit.
  # 3. POST /cats the data in the form
  # 4. Create action is invoked, cat is created.
  # 5. Send client a redirect to /cats/#{id}
  # 6. Client makes a GET request for /cats/#{id}
  # 7. Show action for newly created cat is invoked.

  def new
    # /cats/new
    # show a form to create a new object
    @cat = Cat.new
    render :new
  end

  def update
    @cat = Cat.find(params[:id])
    if @cat.update(cat_params)
      redirect_to cat_url(@cat)
    else
      render :edit
    end
  end

  def edit
    # /cats/:id/edit
    # show a form to edit an existing object
    @cat = Cat.find(params[:id])
    render :edit
  end

  def destroy
    # DELETE /cats/:id
    cat = Cat.find(params[:id])
    cat.destroy
    # session[:notice] = ["Deleted #{cat.name}", true]
    flash[:notice] = "Deleted #{cat.name}"
    redirect_to cats_url

    # 1. GET /cats
    # 2. Click delete button
    # 3. Sends POST /cats/123; but _method="DELETE" so rails understands
    #    to do a destroy
    # 4. Destroys the cat. Issues a redirect to the client.
    # 5. Client GETs /cats again.
  end

  private
  def cat_params
    params[:cat].permit(
      :name, :skill, :coat_color, :description, tag_ids: []
    )
  end
end

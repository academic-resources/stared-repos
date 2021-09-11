class Api::CardsController < ApplicationController
  def create
    @list = List.find(params[:list_id])
    @list.cards.create(card_params)
    @board = Board.find(@list.board_id)
    render "api/boards/show.json.jbuilder"
  end

  def move
    card_id = params[:data][:card_id].to_i
    cards_to_demote = params[:data][:idsOfCardsToDemote] ?
      params[:data][:idsOfCardsToDemote].map { |i| i.to_i } : []
    new_list_id = params[:data][:newListId].to_i

    moved_card = Card.find(card_id)
    moved_card.list_id = new_list_id

    new_list = List.find(new_list_id)
    cards = new_list.cards.sort { |a, b| a.order <=> b.order }

    # give all huge order numbers
    order_num = 1000000
    cards.each do |c|
      c.order = order_num
      c.save
      order_num += 1
    end

    # get saved copies back
    cards = new_list.cards.sort { |a, b| a.order <=> b.order }

    # save with small numbers
    cards.each.with_index do |c, i|
      c.order = i
      c.save
    end

    # get saved copies back
    cards = new_list.cards.sort { |a, b| a.order <=> b.order }

    last_untouched_order = -1
    for card in cards
      if (!cards_to_demote.include?(card.id))
        last_untouched_order = card.order
      end
    end

    moved_card.order = last_untouched_order + 1
    next_order = moved_card.order + 1
    for card in cards
      if (cards_to_demote.include?(card.id))
        card.order = next_order
        next_order += 1
      end
    end

    all_cards = cards << moved_card
    all_cards = all_cards.sort { |a, b| b.order <=> a.order }
    for card in all_cards
      card.save
    end

    @board = Board.find(new_list.board_id)
    render "api/boards/show.json.jbuilder"
  end

  def update
    @card = Card.find(params[:card][:id])
    @card.title = params[:card][:title]
    @card.save
    render :show
  end

  private

  def card_params
    params.require(:card).permit(:title, :description, :order)
  end
end

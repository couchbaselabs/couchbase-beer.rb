module ApplicationHelper
  def markdown(string)
    RDiscount.new(string, :autolink, :safelink).to_html.html_safe
  end

  def render_flash_messages
    [:error, :success, :info].map do |type|
      content_tag(:div, :class => "alert alert-#{type} row-fluid") do
        "<strong>#{type.capitalize}</strong> #{flash[type]}".html_safe
      end if flash[type].present?
    end.join.html_safe
  end

  def favourite_button(item)
    css_class = "bookmark-btn pull-right btn btn-primary"
    if current_user.favourites.include?(item.id)
      css_class << " disabled"
    end
    link_to favourites_path(:id => item.id), :method => :post, :remote => true, :class => css_class do
      "<i class='icon-bookmark icon-white'></i>Like".html_safe
    end
  end
end

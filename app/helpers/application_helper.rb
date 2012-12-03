module ApplicationHelper
  def markdown(string)
    RDiscount.new(string, :autolink, :safelink).to_html.html_safe
  end
end

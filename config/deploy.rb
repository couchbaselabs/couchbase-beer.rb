require "bundler/capistrano"

set :application, "couchbase-beer.rb"
set :repository,  "git://github.com/avsej/couchbase-beer.rb.git"

set :scm, :git
set :deploy_via, :checkout

set :node, "beer.avsej.net"
role :web, node
role :app, node
role :db,  node, :primary => true
set :user, 'beer'
set :use_sudo, false
set :deploy_to, "/home/#{user}/#{application}"

namespace :thin do
  set :thin_config, File.join(shared_path, 'thin.yml')

  task :setup do
    options = {
      :environment => 'production',
      :servers => 2,
      :socket => File.join(shared_path, 'thin.sock'),
      :log => File.join(shared_path, 'log/thin.log'),
      :pid => File.join(shared_path, 'pids/thin.pid'),
      :chdir => current_path,
      :config => thin_config
    }
    run("thin config #{options.map{|k, v| "--#{k}=#{v}"}.join(' ')}")
  end

  [:start, :stop, :restart].each do |action|
    task action, :roles => :app do
      run("thin #{action} -C #{thin_config}")
    end
  end
end
after "deploy:setup", "thin:setup"

namespace :deploy do
  [:start, :stop, :restart].each do |action|
    task action do
      find_and_execute_task("thin:#{action}")
    end
  end
end

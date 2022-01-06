module "main" {
  source                           = "../../modules"
  project_id                       = var.project_id
  project_name                     = var.project_name
  region                           = var.region
  suffix                           = var.suffix
  billing_account                  = var.billing_account
  org_id                           = var.org_id
  discord_client_id                = var.discord_client_id
  discord_secret                   = var.discord_secret
  discord_guild_id                 = var.discord_guild_id
  secret                           = var.secret
  mongodb_uri                      = var.mongodb_uri
  firebase_storage_bucket_url      = var.firebase_storage_bucket_url
  firebase_application_credentials = var.firebase_application_credentials
  hyperscale_app_image_hash        = var.hyperscale_app_image_hash
}

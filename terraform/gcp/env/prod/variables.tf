variable "project_id" {}
variable "project_name" {}
variable "region" {}
variable "suffix" {}
variable "billing_account" {}
variable "org_id" {}
variable "discord_client_id" {
  sensitive = true
}
variable "discord_secret" {
  sensitive = true
}
variable "discord_guild_id" {
  sensitive = true
}
variable "secret" {
  sensitive = true
}
variable "mongodb_uri" {
  sensitive = true
}
variable "firebase_storage_bucket_url" {
  sensitive = true
}
variable "firebase_application_credentials" {
  sensitive = true
}
variable "hyperscale_app_image_hash" {}

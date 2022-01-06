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

terraform {
  required_version = "~> 1.1.2"
  required_providers {
  }
}

provider "google" {
  project = var.project_id
  region = var.region
}

resource "google_project" "project" {
  name       = var.project_name
  project_id = var.project_id
  billing_account = var.billing_account
  org_id = var.org_id
}

output "project_number" {
  value = google_project.project.number
}

# Enable APIs
resource "google_project_service" "project-services" {
  for_each = toset([
    "run.googleapis.com",
  ])
  project = var.project_id
  service = each.key
  disable_on_destroy = true
}

data "google_container_registry_image" "hyperscale-app-image" {
  project = var.project_id
  name = "hyperscale-app"
  tag = var.hyperscale_app_image_hash
}

# Create the Cloud Run service
resource "google_cloud_run_service" "hyperscale-app" {
  name = "hyperscale-app"
  location = var.region

  template {
    spec {
      containers {
        args        = []
        command     = []
        image = data.google_container_registry_image.hyperscale-app-image.image_url
        env {
          name = "DISCORD_CLIENT_ID"
          value = var.discord_client_id
        }
        env {
          name = "DISCORD_SECRET"
          value = var.discord_secret
        }
        env {
          name = "DISCORD_GUILD_ID"
          value = var.discord_guild_id
        }
        env {
          name = "SECRET"
          value = var.secret
        }
        env {
          name = "MONGODB_URI"
          value = var.mongodb_uri
        }
        env {
          name = "FIREBASE_STORAGE_BUCKET_URL"
          value = var.firebase_storage_bucket_url
        }
        env {
          name = "FIREBASE_APPLICATION_CREDENTIALS"
          value = var.firebase_application_credentials
        }
        env {
          name = "GOOGLE_CLOUD_PROJECT"
          value = var.project_id
        }
      }
    }
  }
  traffic {
    percent         = 100
    latest_revision = true
  }
  # Waits for the Cloud Run API to be enabled
  depends_on = [google_project_service.project-services]
}

resource "google_cloud_run_domain_mapping" "hyperscale-app-domain-mapping" {
  location = var.region
  name     = "sphere.hyperscalefund.com"

  metadata {
    namespace = var.project_id
  }

  spec {
    route_name = google_cloud_run_service.hyperscale-app.name
  }
}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location    = google_cloud_run_service.hyperscale-app.location
  project     = google_cloud_run_service.hyperscale-app.project
  service     = google_cloud_run_service.hyperscale-app.name

  policy_data = data.google_iam_policy.noauth.policy_data
}

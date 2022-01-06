terraform {
  backend "gcs" {
    bucket = "hyperscale-prod-tfstate"
  }
}

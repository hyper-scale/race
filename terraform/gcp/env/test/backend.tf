terraform {
  backend "gcs" {
    bucket = "hyperscale-test-tfstate"
  }
}

# Define a struct to represent vulnerabilities
struct Vulnerability {
    name: String,
    impact: String,
    confidence: String,
}

# Function to detect dead-code vulnerability
func detect_dead_code() -> Vulnerability:
    var vulnerabilities: Vulnerability

    func unused_private_function():
        pass  # Simulate unused private function
    # Function never called, detect dead code
    vulnerabilities = Vulnerability(
        name = "dead-code",
        impact = "Low",
        confidence = "Medium"
    )

    return vulnerabilities

# Entry point function to execute vulnerability detection
func main():
    let detected_vulnerability = detect_dead_code()

    # Output detected vulnerability
    log("Detected vulnerability:")
    log("Name:", detected_vulnerability.name)
    log("Impact:", detected_vulnerability.impact)
    log("Confidence:", detected_vulnerability.confidence)

# Entry point execution
main()

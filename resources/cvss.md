
[//]: # (TITLE CVSS)
[//]: # (ENDPOINT /cvss)

# CVSS

> The **Common Vulnerability Scoring System** (CVSS) is a free and open industry standard for assessing the severity of computer system security vulnerabilities.


CVSS attempts to assign severity scores to vulnerabilities, allowing responders to prioritize responses and resources according to threat. Scores are calculated based on a formula that depends on several metrics that approximate ease and impact of an exploit.

Scores range from 0 to 10, with **10 being the most severe**. 

The benefits of CVSS include the provision of a standardized vendor and platform agnostic vulnerability scoring methodology. It is an open framework, providing transparency to the individual characteristics and methodology used to derive a score.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

- [1 - Metrics](#1---metrics)
- [2 - Scoring](#2---scoring)
- [3 - Data representation](#3---data-representation)
- [4 - Python CVSS](#4---python-cvss)
- [5 - Other standards](#5---other-standards)
    - [5.1 CPE](#51-cpe)
    - [5.2 CVEs](#52-cves)
- [7. Thinking material](#7-thinking-material)
    - [7.1 Vulnerability vs weakness](#71-vulnerability-vs-weakness)
- [Sources](#sources)

<!-- markdown-toc end -->


## 1 - Metrics

CVSS is composed of three metric groups:
- The **Base Score** reflects the **severity** of a vulnerability according to its intrinsic characteristics which are **constant over time** and assumes the reasonable worst case impact across different deployed environments.
- The **Temporal Metrics** adjust the Base severity of a vulnerability based on factors that **change over time**, such as the availability of exploit code.
- The **Environmental Metrics** adjust the Base and Temporal severities to a **specific computing environment**. They consider factors such as the presence of mitigations in that environment.

![metrics](MetricGroups.svg)


## 2 - Scoring

When the Base metrics are assigned values by an analyst, the Base equation computes a score ranging from 0.0 to 10.0.

![scoring](EquationsDiagram.svg)

Specifically, the Base equation is derived from two sub equations: the Exploitability sub-score equation, and the Impact sub-score equation.

The Base Score can then be refined by scoring the Temporal and Environmental metrics in order to more accurately reflect the relative severity posed by a vulnerability to a user’s environment at a specific point in time. Scoring the Temporal and Environmental metrics is not required, but is recommended for more precise scores.

Generally, the **Base and Temporal metrics** are specified by vulnerability bulletin analysts, security product vendors, or application vendors because they typically possess the **most accurate information** about the characteristics of a vulnerability. The **Environmental metrics** are specified by **end-user organizations** because they are best able to assess the potential impact of a vulnerability **within their own computing environment**.

Scoring CVSS metrics also produces a **vector string**, a textual representation of the metric values used to score the vulnerability. This vector string is a specifically **formatted text string that contains each value assigned to each metric**, and should always be displayed with the vulnerability score.


## 3 - Data representation

This section is for referencing during development. Not crucial to understanding the concepts.

2.0:
```json
{
    "license": [...],

    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "JSON Schema for Common Vulnerability Scoring System version 2.0",
    "id": "https://www.first.org/cvss/cvss-v2.0.json?20170531",
    "type": "object",
    
    "definitions": {
        "accessVectorType": [ "NETWORK", "ADJACENT_NETWORK", "LOCAL" ],
        "accessComplexityType": [ "HIGH", "MEDIUM", "LOW" ],
        "authenticationType": [ "MULTIPLE", "SINGLE", "NONE" ],
        "ciaType": [ "NONE", "PARTIAL", "COMPLETE" ],
        "exploitabilityType": [ "UNPROVEN", "PROOF_OF_CONCEPT", "FUNCTIONAL", "HIGH", "NOT_DEFINED" ], 
        "remediationLevelType": [ "OFFICIAL_FIX", "TEMPORARY_FIX", "WORKAROUND", "UNAVAILABLE", "NOT_DEFINED" ],
        "reportConfidenceType": [ "UNCONFIRMED", "UNCORROBORATED", "CONFIRMED", "NOT_DEFINED" ],
        "collateralDamagePotentialType": [ "NONE", "LOW", "LOW_MEDIUM", "MEDIUM_HIGH", "HIGH", "NOT_DEFINED" ],
        "targetDistributionType": [ "NONE", "LOW", "MEDIUM", "HIGH", "NOT_DEFINED" ],
        "ciaRequirementType": [ "LOW", "MEDIUM", "HIGH", "NOT_DEFINED" ],
        "scoreType": {"type": "number", "minimum": 0, "maximum": 10}
    },
  
    "properties": {
        "version": {
            "description": "CVSS Version",
            "type": "string",
            "enum": [ "2.0" ]
        },
        "vectorString": {
            "type": "string",
            "pattern": "^((AV:[NAL]|AC:[LMH]|Au:[MSN]|[CIA]:[NPC]|E:(U|POC|F|H|ND)|RL:(OF|TF|W|U|ND)|RC:(UC|UR|C|ND)|CDP:(N|L|LM|MH|H|ND)|TD:(N|L|M|H|ND)|[CIA]R:(L|M|H|ND))/)*(AV:[NAL]|AC:[LMH]|Au:[MSN]|[CIA]:[NPC]|E:(U|POC|F|H|ND)|RL:(OF|TF|W|U|ND)|RC:(UC|UR|C|ND)|CDP:(N|L|LM|MH|H|ND)|TD:(N|L|M|H|ND)|[CIA]R:(L|M|H|ND))$"
        },
        "accessVector":                   { "$ref": "#/definitions/accessVectorType" },
        "accessComplexity":               { "$ref": "#/definitions/accessComplexityType" },
        "authentication":                 { "$ref": "#/definitions/authenticationType" },
        "confidentialityImpact":          { "$ref": "#/definitions/ciaType" },
        "integrityImpact":                { "$ref": "#/definitions/ciaType" },
        "availabilityImpact":             { "$ref": "#/definitions/ciaType" },
        "baseScore":                      { "$ref": "#/definitions/scoreType" },
        "exploitability":                 { "$ref": "#/definitions/exploitabilityType" },
        "remediationLevel":               { "$ref": "#/definitions/remediationLevelType" },
        "reportConfidence":               { "$ref": "#/definitions/reportConfidenceType" },
        "temporalScore":                  { "$ref": "#/definitions/scoreType" },
        "collateralDamagePotential":      { "$ref": "#/definitions/collateralDamagePotentialType" },
        "targetDistribution":             { "$ref": "#/definitions/targetDistributionType" },
        "confidentialityRequirement":     { "$ref": "#/definitions/ciaRequirementType" },
        "integrityRequirement":           { "$ref": "#/definitions/ciaRequirementType" },
        "availabilityRequirement":        { "$ref": "#/definitions/ciaRequirementType" },
        "environmentalScore":             { "$ref": "#/definitions/scoreType" }
    },
    "required": [ "version", "vectorString", "baseScore" ]
}
```

3.1:
```json
{
    "license": [...],

    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "JSON Schema for Common Vulnerability Scoring System version 3.1",
    "$id": "https://www.first.org/cvss/cvss-v3.1.json?20211103",
    "type": "object",
  
    "definitions": {
        "attackVectorType": [ "NETWORK", "ADJACENT_NETWORK", "LOCAL", "PHYSICAL" ],
        "modifiedAttackVectorType": [ "NETWORK", "ADJACENT_NETWORK", "LOCAL", "PHYSICAL", "NOT_DEFINED" ],
        "attackComplexityType": [ "HIGH", "LOW" ],
        "modifiedAttackComplexityType": [ "HIGH", "LOW", "NOT_DEFINED" ],
        "privilegesRequiredType": [ "HIGH", "LOW", "NONE" ],
        "modifiedPrivilegesRequiredType": [ "HIGH", "LOW", "NONE", "NOT_DEFINED" ],
        "userInteractionType": [ "NONE", "REQUIRED" ],
        "modifiedUserInteractionType": [ "NONE", "REQUIRED", "NOT_DEFINED" ],
        "scopeType": [ "UNCHANGED", "CHANGED" ],
        "modifiedScopeType": [ "UNCHANGED", "CHANGED", "NOT_DEFINED" ],
        "ciaType": [ "NONE", "LOW", "HIGH" ],
        "modifiedCiaType": [ "NONE", "LOW", "HIGH", "NOT_DEFINED" ],
        "exploitCodeMaturityType": [ "UNPROVEN", "PROOF_OF_CONCEPT", "FUNCTIONAL", "HIGH", "NOT_DEFINED" ],
        "remediationLevelType": [ "OFFICIAL_FIX", "TEMPORARY_FIX", "WORKAROUND", "UNAVAILABLE", "NOT_DEFINED" ],
        "confidenceType": [ "UNKNOWN", "REASONABLE", "CONFIRMED", "NOT_DEFINED" ],
        "ciaRequirementType": [ "LOW", "MEDIUM", "HIGH", "NOT_DEFINED" ],
        "scoreType": { "type": "number", "minimum": 0, "maximum": 10 },
        "severityType": [ "NONE", "LOW", "MEDIUM", "HIGH", "CRITICAL" ]
    },
  
    "properties": {
        "version": {
            "description": "CVSS Version",
            "type": "string",
            "enum": [ "3.1" ]
        },
        "vectorString": {
            "type": "string",
            "pattern": "^CVSS:3[.]1/((AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$"
        },
 !!     "attackVector":                   { "$ref": "#/definitions/attackVectorType" },
 !!     "attackComplexity":               { "$ref": "#/definitions/attackComplexityType" },
 !!     "privilegesRequired":             { "$ref": "#/definitions/privilegesRequiredType" },
 !!     "userInteraction":                { "$ref": "#/definitions/userInteractionType" },
 !!     "scope":                          { "$ref": "#/definitions/scopeType" },
        "confidentialityImpact":          { "$ref": "#/definitions/ciaType" },
        "integrityImpact":                { "$ref": "#/definitions/ciaType" },
        "availabilityImpact":             { "$ref": "#/definitions/ciaType" },
        "baseScore":                      { "$ref": "#/definitions/scoreType" }, 
!!      "baseSeverity":                   { "$ref": "#/definitions/severityType" },
!!      "exploitCodeMaturity":            { "$ref": "#/definitions/exploitCodeMaturityType" },
        "remediationLevel":               { "$ref": "#/definitions/remediationLevelType" },
        "reportConfidence":               { "$ref": "#/definitions/confidenceType" },
        "temporalScore":                  { "$ref": "#/definitions/scoreType" },
!!      "temporalSeverity":               { "$ref": "#/definitions/severityType" },
        "confidentialityRequirement":     { "$ref": "#/definitions/ciaRequirementType" },
        "integrityRequirement":           { "$ref": "#/definitions/ciaRequirementType" },
        "availabilityRequirement":        { "$ref": "#/definitions/ciaRequirementType" },
!!      "modifiedAttackVector":           { "$ref": "#/definitions/modifiedAttackVectorType" },
!!      "modifiedAttackComplexity":       { "$ref": "#/definitions/modifiedAttackComplexityType" },
!!      "modifiedPrivilegesRequired":     { "$ref": "#/definitions/modifiedPrivilegesRequiredType" },
!!      "modifiedUserInteraction":        { "$ref": "#/definitions/modifiedUserInteractionType" },
!!      "modifiedScope":                  { "$ref": "#/definitions/modifiedScopeType" },
!!      "modifiedConfidentialityImpact":  { "$ref": "#/definitions/modifiedCiaType" },
!!      "modifiedIntegrityImpact":        { "$ref": "#/definitions/modifiedCiaType" },
!!      "modifiedAvailabilityImpact":     { "$ref": "#/definitions/modifiedCiaType" },
        "environmentalScore":             { "$ref": "#/definitions/scoreType" },
!!      "environmentalSeverity":          { "$ref": "#/definitions/severityType" }
    },
    "required": [ "version", "vectorString", "baseScore", "baseSeverity" ]
}
```

!! --> changed or new.


Both:
```json
{...
"impact" : {
      "baseMetricV3" : {
        "cvssV3" : {
          "version" : "3.1",
          "vectorString" : "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N",
          "attackVector" : "NETWORK",
          "attackComplexity" : "LOW",
          "privilegesRequired" : "NONE",
          "userInteraction" : "REQUIRED",
          "scope" : "UNCHANGED",
          "confidentialityImpact" : "LOW",
          "integrityImpact" : "LOW",
          "availabilityImpact" : "NONE",
          "baseScore" : 5.4,
          "baseSeverity" : "MEDIUM"
        },
        "exploitabilityScore" : 2.8,
        "impactScore" : 2.5
      },
      "baseMetricV2" : {
        "cvssV2" : {
          "version" : "2.0",
          "vectorString" : "AV:N/AC:M/Au:N/C:P/I:P/A:N",
          "accessVector" : "NETWORK",
          "accessComplexity" : "MEDIUM",
          "authentication" : "NONE",
          "confidentialityImpact" : "PARTIAL",
          "integrityImpact" : "PARTIAL",
          "availabilityImpact" : "NONE",
          "baseScore" : 5.8
        },
        "severity" : "MEDIUM",
        "exploitabilityScore" : 8.6,
        "impactScore" : 4.9,
        "acInsufInfo" : false,
        "obtainAllPrivilege" : false,
        "obtainUserPrivilege" : false,
        "obtainOtherPrivilege" : false,
        "userInteractionRequired" : true
      }
    }
...
}
```


## 4 - Python CVSS

This Python package contains CVSS v2 and v3 computation utilities and interactive calculator compatible with both Python 2 and Python 3.

```python
from cvss import CVSS2, CVSS3


vector = 'AV:L/AC:L/Au:M/C:N/I:P/A:C/E:U/RL:W/RC:ND/CDP:L/TD:H/CR:ND/IR:ND/AR:M'
c = CVSS2(vector)
print(vector)               # AV:L/AC:L/Au:M/C:N/I:P/A:C/E:U/RL:W/RC:ND/CDP:L/TD:H/CR:ND/IR:ND/AR:M
print(c.clean_vector())     # AV:L/AC:L/Au:M/C:N/I:P/A:C/E:U/RL:W/CDP:L/TD:H/AR:M
print(c.scores())           # (5.0, 4.0, 4.6)


vector = 'CVSS:3.0/S:C/C:H/I:H/A:N/AV:P/AC:H/PR:H/UI:R/E:H/RL:O/RC:R/CR:H/IR:X/AR:X/MAC:H/MPR:X/MUI:X/MC:L/MA:X'
c = CVSS3(vector)
print(vector)               # CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:C/C:H/I:H/A:N/E:H/RL:O/RC:R/CR:H/MAC:H/MC:L
print(c.clean_vector())     # CVSS:3.0/AV:P/AC:H/PR:H/UI:R/S:C/C:H/I:H/A:N/E:H/RL:O/RC:R/CR:H/MAC:H/MC:L
print(c.scores())           # (6.5, 6.0, 5.3)
print(c.severities())       # ('Medium', 'Medium', 'Medium') 
```


## 5 - Other standards

A CVSS score is usually associated with a Common Platform Enumeration (CPE), and a Common Vulnerabilities and Exposures (CVE) ID.

### 5.1 CPE

> A structured naming scheme for information technology systems, software, and packages.

It's based on the generic syntax for URIs, CPE includes a formal name format, a method for checking names against a system, a description format for binding text and tests to a name.

### 5.2 CVEs

> Unique, common identifiers for publicly known cybersecurity vulnerabilities.

CVE is a list of publicly disclosed computer security flaws. When someone refers to a CVE, they mean a security flaw that's been assigned a CVE ID number.

CVE IDs give users a **reliable way to recognize unique vulnerabilities** and coordinate the development of security tools and solutions. The MITRE corporation maintains the CVE List, but a security flaw that becomes a CVE entry is often submitted by organizations and members of the open source community.

CVE IDs are assigned by a CVE Numbering Authority (CNA). There are about 100 CNAs, representing major IT vendors.

Other names of CVE IDs: 
CVE Records, CVE Identifiers, CVE names, CVE numbers, or CVEs.


## 7. Thinking material

### 7.1 Vulnerability vs weakness

While weakness refers to an application error or bug, it may escalate to a vulnerability in cases where it can be exploited to perform a malicious action. The difference between a weakness and a vulnerability is the availability of a specific payload allowing it to be exploited.


## Sources

- [Standards pour la gestion des vulnérabilités](https://www.cert-ist.com/public/fr/SO_detail?code=standards_gestion_vulnerabilites)
- [CVSS doc - FIRST](https://www.first.org/cvss/)
- [Mastering CVSS course transcript](https://www.first.org/cvss/v3.1/mastering-cvss-3.1-transcript)
- [CVSS 3.1 schema](https://www.first.org/cvss/cvss-v3.1.json)
- [CVE doc - RedHat](https://www.redhat.com/en/topics/security/what-is-cve)



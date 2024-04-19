[//]: # (TITLE Pulumi)
[//]: # (ENDPOINT /pulumi)
[//]: # (PRIORITY 4)

# Pulumi

Pulumi is an **infrastructure as code platform** that allows you to **use familiar programming languages and tools to build, deploy, and manage cloud infrastructure**.

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
##### Table of contents

<!-- markdown-toc end -->

## jsp

The Pulumi platform comprises several components:

- **Software development kit** (SDK)<br>Pulumi SDK provides bindings for each type of resource that the provider can manage. This provides the necessary tools and libraries for defining and managing cloud resources on any cloud and with any provider.
- **Command-Line interface** (CLI)<br>Pulumi is controlled primarily using the CLI. It works in conjunction with the Pulumi Cloud to deploy changes to your cloud apps and infrastructure. It keeps a history of who updated what in your team and when. This CLI has been designed for great inner loop productivity, in addition to continuous integration and delivery scenarios.
- **Deployment engine**<br>The deployment engine is responsible for computing the set of operations needed to drive the current state of your infrastructure into the desired state expressed by your program.

Pulumi **programs**, written in general-purpose programming languages, **describe how your cloud infrastructure should be composed**. To declare new infrastructure in your program, you **allocate resource objects** whose properties correspond to the **desired state of your infrastructure**. These properties are also used between resources to handle any necessary dependencies and can be exported outside of the stack, if needed.

**Programs reside in a project**, which is a directory that contains source code for the program and metadata on how to run the program.

After writing your program, you run the Pulumi CLI command `pulumi up` from within your project directory. This command **creates an isolated and configurable instance** of your program, known as a **stack**. Stacks are similar to different deployment environments that you use when testing and rolling out application updates. For instance, you can have distinct development, staging, and production stacks that you create and test against.

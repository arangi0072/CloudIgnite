import psycopg2

def execute_query(query: str):
    """
    Connects to the PostgreSQL database and executes the provided SQL query.
    """
    try:
        conn = psycopg2.connect(
            host="localhost",
            port=5433,
            database="cloudignite_learn_db",
            user="cloudignite_learn",
            password="Learn_2026"
        )
        cursor = conn.cursor()
        cursor.execute(query)
        conn.commit()
        print("✅ Deeply Nested OS Tree & Content inserted successfully!")
        
        cursor.close()
        conn.close()

    except Exception as e:
        print("❌ Query execution failed")
        print(e)

if __name__ == "__main__":
    
    query = """
    -- =========================================
    -- 1. INSERT TOPICS & BUILD HIERARCHY
    -- =========================================
    -- We use ON CONFLICT (path) DO UPDATE to ensure titles are updated (numbers removed)

    -- LEVEL 2: Root
    INSERT INTO topics (slug, title, category, topic_level, topic_order, path, is_category, parent_topic_id)
    VALUES (
        'operating-systems', 'Operating Systems', 'Foundations', 2, 2, 'foundations/operating-systems', true,
        (SELECT id FROM topics WHERE slug = 'foundations')
    ) ON CONFLICT (path) DO UPDATE SET title = EXCLUDED.title;

    -- LEVEL 3: Main Module
    INSERT INTO topics (slug, title, category, topic_level, topic_order, path, is_category, parent_topic_id)
    VALUES 
    ('os-foundations', 'OS Foundations', 'Operating Systems', 3, 1, 'foundations/operating-systems/os-foundations', true, 
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems'))
    ON CONFLICT (path) DO UPDATE SET title = EXCLUDED.title;

    -- LEVEL 4: Sub-Categories under OS Foundations
    INSERT INTO topics (slug, title, category, topic_level, topic_order, path, is_category, parent_topic_id)
    VALUES 
    ('what-is-an-os', 'What is an Operating System', 'Operating Systems', 4, 1, 'foundations/operating-systems/os-foundations/what-is-an-os', true, 
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations')),
    ('evolution-of-os', 'Evolution of Operating Systems', 'Operating Systems', 4, 2, 'foundations/operating-systems/os-foundations/evolution-of-os', true, 
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations')),
    ('types-of-os', 'Types of Operating Systems', 'Operating Systems', 4, 3, 'foundations/operating-systems/os-foundations/types-of-os', true, 
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations'))
    ON CONFLICT (path) DO UPDATE SET title = EXCLUDED.title;

    -- LEVEL 5: Leaf Nodes under Types of Operating Systems
    INSERT INTO topics (slug, title, category, topic_level, topic_order, path, is_category, parent_topic_id)
    VALUES 
    ('batch-os', 'Batch OS', 'Operating Systems', 5, 1, 'foundations/operating-systems/os-foundations/types-of-os/batch-os', false, 
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os')),
    ('time-sharing-os', 'Time Sharing OS', 'Operating Systems', 5, 2, 'foundations/operating-systems/os-foundations/types-of-os/time-sharing-os', false, 
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os')),
    ('distributed-os', 'Distributed OS', 'Operating Systems', 5, 3, 'foundations/operating-systems/os-foundations/types-of-os/distributed-os', false, 
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os')),
    ('real-time-os', 'Real-Time OS', 'Operating Systems', 5, 4, 'foundations/operating-systems/os-foundations/types-of-os/real-time-os', false, 
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os')),
    ('network-os', 'Network OS', 'Operating Systems', 5, 5, 'foundations/operating-systems/os-foundations/types-of-os/network-os', false, 
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os')),
    ('embedded-os', 'Embedded OS', 'Operating Systems', 5, 6, 'foundations/operating-systems/os-foundations/types-of-os/embedded-os', false, 
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os'))
    ON CONFLICT (path) DO UPDATE SET title = EXCLUDED.title;


    -- =========================================
    -- 2. CLEAN UP OLD SECTIONS
    -- =========================================
    
    DELETE FROM topic_sections 
    WHERE topic_id IN (
        SELECT id FROM topics WHERE path LIKE 'foundations/operating-systems/os-foundations%'
    );

    -- =========================================
    -- 3. INSERT RICH CONTENT FOR ALL LEVELS
    -- =========================================

    INSERT INTO topic_sections (topic_id, section_order, section_type, title, content)
    VALUES 

    -- ---------------------------------------------------------
    -- LEVEL 3 PARENT: OS Foundations
    -- ---------------------------------------------------------
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations'), 1, 'concept',
        'The Invisible Conductor',
$$
Welcome to **OS Foundations**. 

If a computer were a grand symphony orchestra, the physical hardware (CPU, RAM, Hard Drive) would be the instruments. The applications (Chrome, Spotify, Video Games) would be the musicians. 

But if you just put 100 musicians in a room and tell them all to play whatever they want at maximum volume, you get chaotic noise. 

You need a **Conductor**. The conductor doesn't actually make any sound. Their entire job is to stand in the center, allocate resources, tell the violins when to play, tell the brass to quiet down, and ensure everything flows in perfect harmony. 

**The Operating System is the Conductor of your computer.** In this module, we will explore exactly what it is, how it evolved from primitive punch cards, and the different forms it takes across the technology spectrum.
$$
    ),

    -- ---------------------------------------------------------
    -- LEVEL 4: What is an Operating System
    -- ---------------------------------------------------------
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/what-is-an-os'), 1, 'concept',
        'The Two Faces of the OS',
$$
An Operating System has a massive split personality. It exists to serve two completely different masters: the Hardware, and the User.

### 1. The Resource Manager (Top-Down View)
Imagine a busy restaurant kitchen. You have 4 burners (CPU cores), limited counter space (RAM), and 10 chefs (Applications) trying to cook 10 different meals at once. Without a Head Chef, they would steal each other's ingredients and fight over the stoves. 
The OS is the Head Chef. It strictly manages who gets CPU time, who gets memory, and ensures no application crashes the entire system.

### 2. The Extended Machine (Bottom-Up View)
Hardware is incredibly ugly and complex. To read a simple file from a hard drive requires hundreds of lines of complex electrical timing instructions. 
The OS hides this nightmare. It provides a beautiful, clean **Abstraction**. Instead of writing electrical signals, a programmer just types `open("file.txt")`. The OS creates the illusion that the computer is a simple, easy-to-use "Extended Machine."
$$
    ),
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/what-is-an-os'), 2, 'architecture',
        'The Onion Architecture',
$$
To protect the system, the OS wraps the hardware in layers of security, much like an onion.

```mermaid
flowchart TD
    subgraph The Onion
        direction TB
        Hardware[1. Physical Hardware - CPU, RAM, Disk]
        Kernel[2. The Kernel - Core OS]
        System[3. System Call Interface]
        Apps[4. User Applications - Browser, Games]
        User[5. You]
    end
    
    User --> Apps
    Apps --> System
    System --> Kernel
    Kernel --> Hardware
    
    style Hardware fill:#333,color:#fff
    style Kernel fill:#d32f2f,color:#fff
    style System fill:#f57c00,color:#fff
```
You (the user) can never touch the hardware directly. Even your web browser cannot touch the hardware. It must politely ask the Kernel (via a System Call) to do the dirty work for it.
$$
    ),

    -- ---------------------------------------------------------
    -- LEVEL 4: Evolution of Operating Systems
    -- ---------------------------------------------------------
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/evolution-of-os'), 1, 'concept',
        'From Vacuum Tubes to Artificial Intelligence',
$$
Operating Systems did not appear overnight. They evolved out of absolute necessity as hardware grew increasingly complex and expensive.

### The First Generation (1945 - 1955): No OS
Early computers like the ENIAC were the size of a house and used vacuum tubes. **There was no Operating System.** Programming meant physically walking inside the machine and plugging cables into different sockets (plugboards). You booked the machine for 2 hours, ran your math equation, and left.

### The Second Generation (1955 - 1965): Batch Systems
Transistors arrived, and computers became faster but incredibly expensive ($10 million+). Having the machine sit idle while a human swapped out tapes was a massive waste of money. 
**The Solution:** The first primitive OS. Programmers punched their code onto paper cards, gave them to an operator, and the OS ran them in a continuous "Batch" one after the other. No human interaction was allowed during execution.
$$
    ),
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/evolution-of-os'), 2, 'deep_dive',
        'The Multiprogramming Revolution',
$$
### The Third Generation (1965 - 1980): Multiprogramming
Computers got Integrated Circuits (Chips). But a new problem arose: I/O (Input/Output). Reading from a magnetic tape was millions of times slower than the CPU. When a job needed to read a tape, the expensive CPU just sat there... waiting.
**The OS Evolution:** The OS learned how to juggle. It loaded multiple jobs into RAM at once. When Job A paused to read a tape, the OS instantly switched the CPU to Job B. This was the birth of **Multiprogramming**.

### The Fourth Generation (1980 - Present): The PC Era
With the invention of microprocessors, computers shrunk to fit on a desk. They were no longer multi-million dollar mainframes; they were Personal Computers.
The OS completely shifted focus. Instead of solely maximizing CPU efficiency, it needed to be user-friendly. This era brought us **Graphical User Interfaces (GUIs)**, macOS, Windows, and eventually mobile operating systems like iOS and Android.
$$
    ),

    -- ---------------------------------------------------------
    -- LEVEL 4: Types of Operating Systems
    -- ---------------------------------------------------------
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os'), 1, 'concept',
        'Why Are There So Many Types?',
$$
Why can't we just use Windows 11 for everything? 

Because different environments have drastically different priorities. 
* A desktop PC prioritizes user responsiveness (your mouse should never lag).
* A web server prioritizes high throughput (serving 10,000 users per second).
* A pacemaker inside a human heart prioritizes absolute, flawless reliability (if it's 1 millisecond late, the patient dies).

Because of these conflicting goals, engineers have developed highly specialized categories of Operating Systems to dominate specific tasks. Let's explore the distinct types.
$$
    ),

    -- ---------------------------------------------------------
    -- LEVEL 5: Batch OS
    -- ---------------------------------------------------------
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os/batch-os'), 1, 'concept',
        'The Assembly Line of Computing',
$$
In a **Batch Operating System**, there is zero direct interaction between the user and the computer while the program is actually running.

**The Analogy: The Laundromat**
Imagine you drop off a bag of dirty laundry at a laundromat. The attendant takes your bag, puts it in a pile with 50 other bags, and processes them one by one. You cannot change your mind halfway through and ask for a different fabric softener. You just wait until the next day to pick up your clean clothes.

In a Batch OS, users submit their jobs (originally on punch cards, today via scripts) to an operator or job queue. The OS groups similar jobs together (a "batch") and executes them sequentially to maximize CPU utilization.

```mermaid
flowchart LR
    U1[User 1: Job A] --> Queue
    U2[User 2: Job B] --> Queue
    U3[User 3: Job C] --> Queue
    Queue[Job Queue] --> OS[Batch OS]
    OS --> CPU[CPU Execution]
    CPU --> Output[Results printed later]
```
$$
    ),
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os/batch-os'), 2, 'explanation',
        'Where is it used today?',
$$
While it sounds like ancient history from the 1960s, Batch Processing is still massively relevant today!

* **Credit Card Billing:** Visa doesn't process your monthly statement the moment you make a purchase. They batch millions of transactions together and an OS processes them all at 2:00 AM when network traffic is low.
* **Payroll Systems:** Generating paychecks for 50,000 employees is a massive batch job run at the end of the month.
* **AI Training:** Training a Large Language Model (like the one writing this) is a massive batch job submitted to a supercomputer cluster.
$$
    ),

    -- ---------------------------------------------------------
    -- LEVEL 5: Time Sharing OS
    -- ---------------------------------------------------------
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os/time-sharing-os'), 1, 'concept',
        'The Simultaneous Chess Master',
$$
A **Time-Sharing OS** (also called Multitasking) is the direct opposite of a Batch OS. It is designed to give the illusion that multiple users (or applications) have exclusive access to the CPU at the exact same time.

**The Analogy: The Grandmaster**
Imagine a Chess Grandmaster playing against 30 amateurs simultaneously. The Grandmaster walks to Table 1, makes a move instantly, walks to Table 2, makes a move, and so on. Because the Grandmaster is so incredibly fast, every amateur feels like they are playing a continuous 1-on-1 game. 

The Time-Sharing OS gives every active process a tiny fraction of a second (a **Time Slice** or Quantum). It switches between processes so fast (thousands of times a second) that you can watch a YouTube video, download a file, and move your mouse all at once.
$$
    ),

    -- ---------------------------------------------------------
    -- LEVEL 5: Distributed OS
    -- ---------------------------------------------------------
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os/distributed-os'), 1, 'concept',
        'The Hive Mind',
$$
A **Distributed Operating System** manages a group of independent, physically separated computers and makes them appear to the user as a single, massive computer.

**The Analogy: The Ant Colony**
A single ant is weak. But a colony of a million ants operates with a shared "hive mind" to build massive structures. If you step on 100 ants, the colony doesn't collapse; it just routes around the damage.

In a Distributed OS, you might log into what looks like one normal server. But when you run a heavy calculation, the OS secretly breaks the math into 500 pieces, sends those pieces over the network to 500 different physical motherboards in a data center, collects the results, and hands them back to you.

```mermaid
flowchart TD
    User[User Interface] --> DOS[Distributed OS Layer]
    DOS --> S1[Server in New York]
    DOS --> S2[Server in London]
    DOS --> S3[Server in Tokyo]
    
    style DOS fill:#2e7d32,color:#fff
```
**Key Feature:** Fault Tolerance. If the server in London catches fire, the Distributed OS instantly reroutes the work to Tokyo. The user never even knows there was a hardware failure.
$$
    ),

    -- ---------------------------------------------------------
    -- LEVEL 5: Real-Time OS (RTOS)
    -- ---------------------------------------------------------
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os/real-time-os'), 1, 'concept',
        'When Being Late Means Death',
$$
A **Real-Time Operating System (RTOS)** is a specialized OS with absolute, mathematically guaranteed time constraints. It is not about being "fast"; it is about being strictly **predictable**.

**The Analogy: The Parachute**
If you pull the ripcord on a parachute, it doesn't matter if it opens in 0.1 seconds or 0.5 seconds. What matters is that it NEVER takes 10 seconds. If a normal OS (like Windows) decides to run a background antivirus update exactly when you pull the ripcord, you hit the ground. An RTOS guarantees the ripcord gets highest priority, always.

### Hard Real-Time vs. Soft Real-Time
* **Hard Real-Time:** Missing a deadline results in total system failure or loss of life.
  * *Examples:* Car airbags, airplane flight controls, medical pacemakers, industrial robots.
* **Soft Real-Time:** Missing a deadline degrades performance but the system survives.
  * *Examples:* Live video streaming, multiplayer gaming servers. If a frame drops, it's annoying, but nobody dies.
$$
    ),

    -- ---------------------------------------------------------
    -- LEVEL 5: Network OS
    -- ---------------------------------------------------------
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os/network-os'), 1, 'concept',
        'The Corporate Manager',
$$
A **Network Operating System (NOS)** runs on a centralized server and manages data, users, groups, security, and network applications across a local area network (LAN).

Unlike a Distributed OS (which tries to hide the fact that there are multiple computers), a Network OS embraces the Client-Server model.

**The Analogy: The High School Library**
You are a student (Client) working on a library computer. You don't own the files on that computer. When you save a document, it goes to the central Librarian's desk (the Network OS Server). The Librarian checks your ID (Authentication), checks your permissions (Authorization), and saves it safely in the vault. 

*Examples:* Windows Server, Novell NetWare (historically), and specialized Linux servers managing LDAP/Active Directory. They centralize control so IT administrators can manage 10,000 office laptops from one dashboard.
$$
    ),

    -- ---------------------------------------------------------
    -- LEVEL 5: Embedded OS
    -- ---------------------------------------------------------
    (
        (SELECT id FROM topics WHERE path = 'foundations/operating-systems/os-foundations/types-of-os/embedded-os'), 1, 'concept',
        'The Dedicated Specialist',
$$
An **Embedded Operating System** is designed to run on hardware that is physically built into a larger mechanical or electrical system. They are incredibly stripped-down and highly optimized to do exactly *one thing* perfectly for 10 years without ever being rebooted.

**The Analogy: The Sniper**
A standard OS like Windows is a Swiss Army Knife—it can play games, edit video, and browse the web, but it's bloated. An Embedded OS is a sniper rifle. It has exactly one purpose, zero bloat, and executes its mission flawlessly.

### Where are they?
They are everywhere you don't realize there is a computer:
* Your microwave oven's timer and keypad.
* Smart TVs and washing machines.
* IoT (Internet of Things) devices like smart thermostats.
* The anti-lock braking sensors in your car's tires.

Because they often run on chips with mere kilobytes of RAM and virtually zero electrical power, they are custom-compiled. If an Embedded OS runs a microwave, it literally doesn't contain the code required to draw a mouse cursor on a screen, because it will never need it!
$$
    );
    """

    execute_query(query)
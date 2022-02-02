import { Request } from 'express'

export interface Game {
    /**
     * A unique identifier for this Game.
     * Example: "totally-unique-game-id"
     */
    id: string

    /**
     * Information about the ruleset being used to run this game.
     */
    ruleset?: RuleSet

    /**
     * How much time your snake has to respond to
     * requests for this Game in milliseconds (integer).
     * Example: 500
     */
    timeout: number
}

export interface RuleSet {
    /**
     * Name of the ruleset being used to run this game.
     */
    name: GameModes

    /**
     * The release version of the Rules module used in this game.
     * Example: "v1.2.3"
     */
    version: string

    /**
     * A collection of specific settings being used by the
     * current game that control how the rules are applied.
     */
    settings: GameSettings
}

export type GameModes =
    | 'standard'
    | 'solo'
    | 'royale'
    | 'squad'
    | 'constrictor'
    | 'wrapped'

export interface GameSettings {
    /**
     * Percentage chance of spawning a new food every round.
     * Example: 25
     */
    foodSpawnChance: number

    /**
     * Minimum food to keep on the board every turn.
     * Example: 1
     */
    minimumFood: number

    /**
     * Health damage a snake will take when ending its turn in a hazard.
     * This stacks on top of the regular 1 damage a snake takes per turn.
     * Example: 14
     */
    hazardDamagePerTurn: number

    /**
     * A string identifier that describes the type of
     * hazard map that is used in the game.
     * Example: "hz_spiral"
     */
    map: string

    royale: RoyaleSettings

    squad: SquadSettings
}

export interface RoyaleSettings {
    /**
     * The number of turns between generating
     * new hazards (shrinking the safe board space).
     * Example: 5
     */
    shrinkEveryNTurns: number
}

export interface SquadSettings {
    /**
     * Allow members of the same squad to move over each other without dying.
     * Example: true
     */
    allowBodyCollisions: boolean

    /**
     * All squad members are eliminated when one is eliminated.
     * Example: true
     */
    sharedElimination: boolean

    /**
     * All squad members share health.
     * Example: true
     */
    sharedHealth: boolean

    /**
     * All squad members share length.
     * Example: true
     */
    sharedLength: boolean
}

export interface Coordinates {
    /**
     * An x-coordinate on the board (integer).
     * Example: 1
     */
    x: number

    /**
     * An y-coordinate on the board (integer).
     * Example: 1
     */
    y: number
}

export interface Snake {
    /**
     * Unique identifier for this Battlesnake in the context of the current Game.
     * Example: "totally-unique-snake-id"
     */
    id: string

    /**
     * Name given to this Battlesnake by its author.
     * Example: "Sneky McSnek Face"
     */
    name: string

    /**
     * Health value (integer) of this Battlesnake, between 0 and 100 inclusively.
     * Example: 54
     */
    health: number

    /** Array of coordinates representing this Battlesnake's location on the game board.
     * This array is ordered from head to tail.
     * Example: [{"x": 0, "y": 0}, ..., {"x": 2, "y": 0}] */
    body: Coordinates[]

    /**
     * The previous response time of this Battlesnake, in milliseconds.
     * "0" means the Battlesnake timed out and failed to respond.
     * Example: "450"
     */
    latency: string

    /**
     * Coordinates for this Battlesnake's head.
     * Equivalent to the first element of the body array.
     * Example: {"x": 0, "y": 0}
     */
    head: Coordinates

    /**
     * Length of this Battlesnake from head to tail.
     * Equivalent to the length (integer) of the body array.
     * Example: 3
     */
    length: number

    /**
     * Message shouted by this Battlesnake on the previous turn.
     * Example: "why are we shouting??"
     */
    shout: string

    /**
     * The squad that the Battlesnake belongs to.
     * Used to identify squad members in Squad Mode games.
     * Example: "1"
     */
    squad: string

    /**
     * The collection of customizations applied to
     * this Battlesnake that represent how it is viewed.
     */
    customizations: SnakeInfo
}

export interface Board {
    /**
     * Height of the game board (integer).
     * Example: 11
     */
    height: number

    /**
     * Width of the game board (integer).
     * Example: 11
     */
    width: number

    /**
     * Array of coordinates representing food locations on the game board.
     * Example: [{"x": 5, "y": 5}, ..., {"x": 2, "y": 6}]
     */
    food: Coordinates[]

    /**
     * Array of coordinates representing hazardous locations on the game board.
     * These will only appear in some game modes.
     * Example: [{"x": 0, "y": 0}, ..., {"x": 0, "y": 1}]
     */
    harzards: Coordinates[]

    /**
     * Array of Battlesnake Objects representing all Battlesnakes
     * remaining on the game board (including yourself if you haven't been eliminated).
     * Example: [{"id": "snake-one", ...}, ...]
     */
    snakes: Snake[]
}

export interface SnakeInfo {
    /**
     * Version of the Battlesnake API implemented by this Battlesnake.
     * Example: "1"
     */
    apiversion: string

    /** Username of the author of this Battlesnake.
     * If provided, this will be used to verify ownership.
     * Example: "BattlesnakeOfficial" */
    author?: string

    /**
     * Hex color code used to display this Battlesnake.
     * Must start with "#" and be 7 characters long.
     * Example: "#888888" */
    color?: string

    /**
     * Displayed head of this Battlesnake.
     * See battlesnake.io docs for head images.
     * Example: "default"
     */
    head?: Heads

    /**
     * Displayed tail of this Battlesnake.
     * See battlesnake.io docs for tail images.
     * Example: "default" */
    tail?: Tails

    /**
     * A version number or tag for your snake.
     */
    version?: string
}

export interface GameState {
    /**
     * Game Object describing the game being played.
     */
    game: Game

    /**
     * Turn number (integer) of the game being played (0 for new games).
     */
    turn: number

    /**
     * Board Object describing the initial state of the game board.
     */
    board: Board

    /**
     * Battlesnake Object describing your Battlesnake.
     */
    you: Battlesnake
}

export type Direction = 'up' | 'left' | 'down' | 'right'

export interface Move {
    /**
     * Your Battlesnake's move for this turn.
     * Valid moves are up, down, left, or right.
     * Example: "up"
     */
    move: Direction

    /**
     * An optional message sent to all other Battlesnakes
     * on the next turn. Must be 256 characters or less.
     * Example: "I am moving up!"
     */
    shout?: string
}

export type GameRequest = Request<{}, {}, GameState>

/**
 * All the heads that are available in BattleSnake.
 * Note some heads may only be used if they are awarded.
 */
export type Heads =
    | DefaultHead
    | StandardHeads
    | BrandedCustomizationsHeads
    | CommunityHeads
    | WinterClassic2019Heads
    | StayHomeAndCode2020Heads
    | FallLeague2020Heads
    | MembershipRewards2021Heads
    | SpringLeague2021Heads
    | SummerLeague2021Heads
    | FallLeague2021Heads

/**
 * The default head.
 */
export type DefaultHead = 'default'

/**
 * The standard set of head customizations available to everyone.
 */
export type StandardHeads =
    | 'beluga'
    | 'bendr'
    | 'dead'
    | 'evil'
    | 'fang'
    | 'pixel'
    | 'sand-worm'
    | 'safe'
    | 'shades'
    | 'silly'
    | 'smile'
    | 'tongue'

/**
 * Designed by friends and partners of Battlesnake!
 */
export type BrandedCustomizationsHeads = 'rbc-bowler' | 'repit-mark'

/**
 * Designed by the community for everyone to use.
 */
export type CommunityHeads =
    | 'all-seeing'
    | 'smart-caterpillar'
    | 'trans-rights-scarf'

/**
 * Released for the Battlesnake Winter Classic 2019 tournament.
 * Available for everyone.
 */
export type WinterClassic2019Heads =
    | 'bonhomme'
    | 'earmuffs'
    | 'rudolph'
    | 'scarf'
    | 'ski'
    | 'snow-worm'
    | 'snowman'

/**
 * Released for the 2020 Stay Home and Code competition.
 * Available for everyone.
 */
export type StayHomeAndCode2020Heads =
    | 'caffeine'
    | 'gamer'
    | 'workout'
    | 'tiger-king'

/**
 * Rewards for Fall League 2020 Challenge Arenas
 */
export type FallLeague2020Heads = 'jackolantern' | 'pumpkin'

/**
 * Awarded to members throughout the 2021 Battlesnake Competitive Season.
 */
export type MembershipRewards2021Heads =
    | 'alligator'
    | 'comet'
    | 'football'
    | 'iguana'
    | 'latern-fish'
    | 'missile'
    | 'mask'
    | 'moto-helment'
    | 'moustache'
    | 'snail'
    | 'rocket-helmet'
    | 'space-helmet'

/**
 * Head rewards for competing in the Spring League 2021 competition.
 */
export type SpringLeague2021Heads =
    | 'chomp'
    | 'pixel-round'
    | 'rbc-bowler'
    | 'sneaky'
    | 'orca'

/**
 * Head rewards for Summer League 2021.
 */
export type SummerLeague2021Heads = 'villian' | 'viper'

/**
 * Rewards for Fall League 2021.
 */
export type FallLeague2021Heads = 'happy' | 'whale'

/**
 * All the tails that are available in BattleSnake.
 * Note some tails may only be used if they are awarded.
 */
export type Tails =
    | DefaultTail
    | StandardTails
    | BrandedCustomizationsTails
    | CommunityTails
    | WinterClassic2019Tails
    | StayHomeAndCode2020Tails
    | FallLeague2020Tails
    | MembershipRewards2021Tails
    | SpringLeague2021Tails
    | SummerLeague2021Tails
    | FallLeague2021Tails

/**
 * The default tail.
 */
export type DefaultTail = 'default'

/**
 * The standard set of tail customizations available to everyone.
 */
export type StandardTails =
    | 'default'
    | 'block-bum'
    | 'bolt'
    | 'curled'
    | 'fat-rattle'
    | 'freckle'
    | 'hook'
    | 'pixel'
    | 'round-bum'
    | 'sharp'
    | 'skinny'
    | 'small-rattle'

/**
 * Designed by friends and partners of Battlesnake!
 */
export type BrandedCustomizationsTails = 'rbc-necktie' | 'replit-notmark'

/**
 * Designed by the community for everyone to use.
 */
export type CommunityTails = 'mystic-moon'

/**
 * Released for the Battlesnake Winter Classic 2019 tournament.
 * Available for everyone.
 */
export type WinterClassic2019Tails =
    | 'bonhomme'
    | 'flake'
    | 'ice-skate'
    | 'present'

/**
 * Released for the 2020 Stay Home and Code competition.
 * Available for everyone.
 */
export type StayHomeAndCode2020Tails =
    | 'coffee'
    | 'mouse'
    | '-weight'
    | 'tiger-tail'

/**
 * Rewards for Fall League 2020 Challenge Arenas.
 */
export type FallLeague2020Tails = 'leaf' | 'pumpkin'

/**
 * Awarded to members throughout the 2021 Battlesnake Competitive Season.
 */
export type MembershipRewards2021Tails =
    | 'alligator'
    | 'comet'
    | 'fish'
    | 'flame'
    | 'football'
    | 'iguana'
    | 'ion'
    | 'missile'
    | 'shinny-jeans'
    | 'snail'
    | 'tire'
    | 'virus'

/**
 * Tail rewards for competing in the Spring League 2021 competition.
 */
export type SpringLeague2021Tails =
    | 'ghost'
    | 'pixel-round'
    | 'rbc-necktie'
    | 'swirl'
    | 'swoop'

/**
 * Tail rewards for Summer League 2021.
 */
export type SummerLeague2021Tails = 'rattle' | 'rocket'

/**
 * Rewards for Fall League 2021.
 */
export type FallLeague2021Tails = 'offroad' | 'shiny'

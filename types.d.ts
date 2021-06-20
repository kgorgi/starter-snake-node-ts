import { Request } from 'express'

export interface Game {
    /**
     * A unique identifier for this Game.
     * Example: "totally-unique-game-id"
     */
    id: string

    /**
     * Information about the ruleset being used to run this game.
     * Example: {"name": "standard", "version": "v1.2.3"}
     */
    ruleset?: { name: string; version: string }

    /**
     * How much time your snake has to respond to
     * requests for this Game in milliseconds (integer).
     * Example: 500
     */
    timeout: number
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
type Heads =
    | StandardHeads
    | WinterClassic2019Heads
    | StayHomeAndCodeHeads
    | FallLeague2020Heads
    | MembershipRewards2021Heads
    | SpringLeague2021Heads
    | SummerLeague2021Heads

/**
 * The standard set of head customizations available to everyone.
 */
type StandardHeads =
    | 'default'
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
 * Released for the Battlesnake Winter Classic 2019 tournament.
 * Available for everyone.
 */
type WinterClassic2019Heads =
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
type StayHomeAndCodeHeads = 'caffeine' | 'gamer' | 'workout' | 'tiger-king'

/**
 * Rewards for Fall League 2020 Challenge Arenas
 */
type FallLeague2020Heads = 'jackolantern' | 'pumpkin'

/**
 * Awarded to members throughout the 2021 Battlesnake Competitive Season.
 */
type MembershipRewards2021Heads =
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
type SpringLeague2021Heads =
    | 'chomp'
    | 'pixel-round'
    | 'rbc-bowler'
    | 'sneaky'
    | 'orca'

/**
 * Head rewards for Summer League 2021.
 */
type SummerLeague2021Heads = 'villian' | 'viper'

/**
 * All the tails that are available in BattleSnake.
 * Note some tails may only be used if they are awarded.
 */
type Tails =
    | StandardTails
    | WinterClassic2019Tails
    | StayHomeAndCodeTails
    | FallLeague2020Tails
    | MembershipRewards2021Tails
    | SpringLeague2021Tails
    | SummerLeague2021Tails

/**
 * The standard set of tail customizations available to everyone.
 */
type StandardTails =
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
 * Released for the Battlesnake Winter Classic 2019 tournament.
 * Available for everyone.
 */
type WinterClassic2019Tails = 'bonhomme' | 'flake' | 'ice-skate' | 'present'

/**
 * Released for the 2020 Stay Home and Code competition.
 * Available for everyone.
 */
type StayHomeAndCodeTails = 'coffee' | 'mouse' | '-weight' | 'tiger-tail'

/**
 * Rewards for Fall League 2020 Challenge Arenas.
 */
type FallLeague2020Tails = 'leaf' | 'pumpkin'

/**
 * Awarded to members throughout the 2021 Battlesnake Competitive Season.
 */
type MembershipRewards2021Tails =
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
type SpringLeague2021Tails =
    | 'ghost'
    | 'pixel-round'
    | 'rbc-necktie'
    | 'swirl'
    | 'swoop'

/**
 * Tail rewards for Summer League 2021.
 */
type SummerLeague2021Tails = 'rattle' | 'rocket'

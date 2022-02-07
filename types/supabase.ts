/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/exercises": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.exercises.id"];
          created_at?: parameters["rowFilter.exercises.created_at"];
          user_id?: parameters["rowFilter.exercises.user_id"];
          is_completed?: parameters["rowFilter.exercises.is_completed"];
          exercise_number?: parameters["rowFilter.exercises.exercise_number"];
          updated_at?: parameters["rowFilter.exercises.updated_at"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["exercises"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** exercises */
          exercises?: definitions["exercises"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.exercises.id"];
          created_at?: parameters["rowFilter.exercises.created_at"];
          user_id?: parameters["rowFilter.exercises.user_id"];
          is_completed?: parameters["rowFilter.exercises.is_completed"];
          exercise_number?: parameters["rowFilter.exercises.exercise_number"];
          updated_at?: parameters["rowFilter.exercises.updated_at"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.exercises.id"];
          created_at?: parameters["rowFilter.exercises.created_at"];
          user_id?: parameters["rowFilter.exercises.user_id"];
          is_completed?: parameters["rowFilter.exercises.is_completed"];
          exercise_number?: parameters["rowFilter.exercises.exercise_number"];
          updated_at?: parameters["rowFilter.exercises.updated_at"];
        };
        body: {
          /** exercises */
          exercises?: definitions["exercises"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/quizzes": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.quizzes.id"];
          created_at?: parameters["rowFilter.quizzes.created_at"];
          completed?: parameters["rowFilter.quizzes.completed"];
          updated_at?: parameters["rowFilter.quizzes.updated_at"];
          user_id?: parameters["rowFilter.quizzes.user_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["quizzes"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** quizzes */
          quizzes?: definitions["quizzes"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.quizzes.id"];
          created_at?: parameters["rowFilter.quizzes.created_at"];
          completed?: parameters["rowFilter.quizzes.completed"];
          updated_at?: parameters["rowFilter.quizzes.updated_at"];
          user_id?: parameters["rowFilter.quizzes.user_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.quizzes.id"];
          created_at?: parameters["rowFilter.quizzes.created_at"];
          completed?: parameters["rowFilter.quizzes.completed"];
          updated_at?: parameters["rowFilter.quizzes.updated_at"];
          user_id?: parameters["rowFilter.quizzes.user_id"];
        };
        body: {
          /** quizzes */
          quizzes?: definitions["quizzes"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/ratings": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ratings.id"];
          created_at?: parameters["rowFilter.ratings.created_at"];
          updated_at?: parameters["rowFilter.ratings.updated_at"];
          exercise_id?: parameters["rowFilter.ratings.exercise_id"];
          usefulness?: parameters["rowFilter.ratings.usefulness"];
          difficulty?: parameters["rowFilter.ratings.difficulty"];
          comment?: parameters["rowFilter.ratings.comment"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["ratings"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** ratings */
          ratings?: definitions["ratings"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ratings.id"];
          created_at?: parameters["rowFilter.ratings.created_at"];
          updated_at?: parameters["rowFilter.ratings.updated_at"];
          exercise_id?: parameters["rowFilter.ratings.exercise_id"];
          usefulness?: parameters["rowFilter.ratings.usefulness"];
          difficulty?: parameters["rowFilter.ratings.difficulty"];
          comment?: parameters["rowFilter.ratings.comment"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.ratings.id"];
          created_at?: parameters["rowFilter.ratings.created_at"];
          updated_at?: parameters["rowFilter.ratings.updated_at"];
          exercise_id?: parameters["rowFilter.ratings.exercise_id"];
          usefulness?: parameters["rowFilter.ratings.usefulness"];
          difficulty?: parameters["rowFilter.ratings.difficulty"];
          comment?: parameters["rowFilter.ratings.comment"];
        };
        body: {
          /** ratings */
          ratings?: definitions["ratings"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/handle_new_user": {
    post: {
      parameters: {
        body: {
          args: { [key: string]: unknown };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  exercises: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: uuid */
    user_id?: string;
    /** Format: boolean */
    is_completed?: boolean;
    /** Format: smallint */
    exercise_number?: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    updated_at?: string;
  };
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /** Format: timestamp with time zone */
    updated_at?: string;
    /** Format: text */
    username?: string;
    /** Format: text */
    avatar_url?: string;
  };
  quizzes: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: ARRAY */
    completed?: string[];
    /** Format: timestamp with time zone */
    updated_at?: string;
    /** Format: uuid */
    user_id: string;
  };
  ratings: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: timestamp with time zone */
    updated_at?: string;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `exercises.id`.<fk table='exercises' column='id'/>
     */
    exercise_id?: string;
    /** Format: smallint */
    usefulness?: number;
    /** Format: smallint */
    difficulty?: number;
    /** Format: character varying */
    comment?: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description exercises */
  "body.exercises": definitions["exercises"];
  /** Format: uuid */
  "rowFilter.exercises.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.exercises.created_at": string;
  /** Format: uuid */
  "rowFilter.exercises.user_id": string;
  /** Format: boolean */
  "rowFilter.exercises.is_completed": string;
  /** Format: smallint */
  "rowFilter.exercises.exercise_number": string;
  /** Format: timestamp with time zone */
  "rowFilter.exercises.updated_at": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.profiles.updated_at": string;
  /** Format: text */
  "rowFilter.profiles.username": string;
  /** Format: text */
  "rowFilter.profiles.avatar_url": string;
  /** @description quizzes */
  "body.quizzes": definitions["quizzes"];
  /** Format: uuid */
  "rowFilter.quizzes.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.quizzes.created_at": string;
  /** Format: ARRAY */
  "rowFilter.quizzes.completed": string;
  /** Format: timestamp with time zone */
  "rowFilter.quizzes.updated_at": string;
  /** Format: uuid */
  "rowFilter.quizzes.user_id": string;
  /** @description ratings */
  "body.ratings": definitions["ratings"];
  /** Format: uuid */
  "rowFilter.ratings.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.ratings.created_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.ratings.updated_at": string;
  /** Format: uuid */
  "rowFilter.ratings.exercise_id": string;
  /** Format: smallint */
  "rowFilter.ratings.usefulness": string;
  /** Format: smallint */
  "rowFilter.ratings.difficulty": string;
  /** Format: character varying */
  "rowFilter.ratings.comment": string;
}

export interface operations {}

export interface external {}
